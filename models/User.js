const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
	email: { ...commonConfig, unique: true },
	joinDate: {
		type: Date,
		default: Date.now,
	},
	favorites: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Recipe',
	},
});

UserSchema.pre('save', function(next) {
	if (!this.isModified('password')) return next();
	const saltRounds = 10;

	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) return next(err);

		return bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err);
			// Store hash in your password DB.
			this.password = hash;
			return next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema);
