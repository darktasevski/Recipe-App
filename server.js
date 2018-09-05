require('dotenv').config({
	path: 'variables.env',
});
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// GraphQL express middleware
const { ApolloServer } = require('apollo-server-express');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');

const PORT = process.env.PORT || 5050;

const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: {
		settings: {
			// 'editor.theme': 'light',
		},
	},
	context: ({ req }) => ({
		Recipe,
		User,
		currentUser: req.currentUser,
	}),
});

// Set up JWT auth middleware
app.use(async (req, res, next) => {
	const token = req.headers['authorization'];

	if (token && token !== 'null') {
		try {
			const currentUser = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(currentUser);
			req.currentUser = currentUser;
		} catch (err) {
			console.error(err);
		}
	}
	return next();
});

server.applyMiddleware({ app });

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose
	.connect(
		process.env.MONGO_URI,
		{ useNewUrlParser: true }
	)
	.then(() => console.info(`Connected to MongoDB`))
	.catch(err => console.error(err));

app.listen(PORT, () =>
	console.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
