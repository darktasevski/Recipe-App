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
	},
};
