const { gql } = require('apollo-server-express');

// GraphQL Schema
exports.typeDefs = gql`
	type Recipe {
		id: ID!
		name: String!
		imageUrl: String!
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
		getRecipe(id: ID!): Recipe
		searchRecipes(searchTerm: String): [Recipe]

		getCurrentUser: User
		getUserRecipes(username: String!): [Recipe]
	}

	type Token {
		token: String!
	}

	type Mutation {
		addRecipe(
			name: String!
			imageUrl: String!
			description: String!
			category: String!
			instructions: String!
			username: String
		): Recipe
		deleteUserRecipe(id: ID!): Recipe
		likeRecipe(id: ID!, username: String!): Recipe
		unlikeRecipe(id: ID!, username: String!): Recipe

		loginUser(username: String!, password: String!): Token
		registerUser(username: String!, email: String!, password: String!): Token
	}
`;
