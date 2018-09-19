const mongoose = require('mongoose');

const commonConfig = {
	type: String,
	required: true,
};

const RecipeSchema = new mongoose.Schema({
	name: { ...commonConfig },
	category: { ...commonConfig },
	description: { ...commonConfig },
	instructions: { ...commonConfig },
	createdDate: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: Number,
		default: 0,
	},
	username: {
		type: String,
	},
});
// set up index and search on every field of our recipe
RecipeSchema.index({
	'$**': 'text',
});

module.exports = mongoose.model('Recipe', RecipeSchema);
