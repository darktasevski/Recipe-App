require('dotenv').config({
	path: 'variables.env',
});
const express = require('express');
const mongoose = require('mongoose');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5050;

mongoose.Promise = global.Promise;
mongoose
	.connect(
		process.env.MONGO_URI,
		{ useNewUrlParser: true }
	)
	.then(() => console.info(`Connected to MongoDB`))
	.catch(err => console.error(err));

app.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));
