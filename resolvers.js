const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user;
	return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
	Query: {
		async getAllRecipes(root, args, { Recipe }) {
			const result = await Recipe.find().sort({ createdDate: 'desc' });
			return result;
		},
		async getRecipe(root, { id }, { Recipe }) {
			const recipe = await Recipe.findById(id);
			return recipe;
		},
		async searchRecipes(root, { searchTerm }, { Recipe }) {
			let recipes;
			if (searchTerm) {
				recipes = await Recipe.find(
					{
						$text: { $search: searchTerm },
					},
					{ score: { $meta: 'textScore' } }
				).sort({ score: { $meta: 'textScore' } });
			} else {
				recipes = await Recipe.find({}).sort({ likes: 'desc', createdDate: 'desc' });
			}

			return recipes;
		},
		async getCurrentUser(root, args, { currentUser, User }) {
			if (!currentUser) return null;

			const user = await User.findOne({ username: currentUser.username }).populate({
				path: 'favorites',
				model: 'Recipe',
			});

			return user;
		},
	},
	Mutation: {
		async addRecipe(root, { name, description, category, instructions, username }, { Recipe }) {
			const newRecipe = await new Recipe({
				name,
				description,
				category,
				instructions,
				username,
			}).save();

			return newRecipe;
		},
		async loginUser(root, { username, password }, { User }) {
			const user = await User.findOne({ username });

			if (!user) {
				throw new Error('User not found!');
			}

			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) throw new Error('Authentication error');

			return { token: createToken(user, process.env.JWT_SECRET, '1hr') };
		},
		async registerUser(root, { username, email, password }, { User }) {
			const user = await User.findOne({ username });

			if (user) {
				throw new Error('User already exists!');
			}
			const newUser = await new User({
				username,
				email,
				password,
			}).save();

			return { token: createToken(newUser, process.env.JWT_SECRET, '1hr') };
		},
	},
};
