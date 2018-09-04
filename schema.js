const { gql } = require('apollo-server-express');

// GraphQL Schema
exports.typeDefs = gql`
	type Recipe {
		id: ID!
		name: String!
		category: String!
		description: String!
		instructions: String!
		createdDate: String
		likes: Int
		username: String
	}

	type User {
		id: ID!
		username: String!
		password: String!
		email: String!
		joinDate: String
		favorites: [Recipe]
	}

	type Query {
		getAllRecipes: [Recipe]
	}

	type Token {
		token: String!
	}

	type Mutation {
		addRecipe(
			name: String!
			description: String!
			category: String!
			instructions: String!
			username: String
		): Recipe

		registerUser(username: String!, email: String!, password: String!): Token
	}
`;
