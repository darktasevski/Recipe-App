const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user;
	return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
	Query: {
		async getAllRecipes(root, args, { Recipe }) {
			const result = await Recipe.find();
			return result;
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
