const mongoose = require('mongoose');

const commonConfig = {
	type: String,
	required: true,
};

const UserSchema = new mongoose.Schema({
	username: {
		...commonConfig,
		unique: true,
	},
	password: { ...commonConfig },
	email: { ...commonConfig },
	joinDate: {
		type: Date,
		default: Date.now,
	},
	favorites: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Recipe',
	},
});

module.exports = mongoose.model('User', UserSchema);
