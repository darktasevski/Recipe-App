require('dotenv').config({
	path: 'variables.env',
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// GraphQL express middleware
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');

const PORT = process.env.PORT || 5050;

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

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

app.use(bodyParser);

app.listen(PORT, () =>
	console.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
