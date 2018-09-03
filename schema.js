const { gql } = require('apollo-server-express');
// GraphQL Schema
exports.typeDefs = gql`
	type Recipe {
		name: String!
		category: String!
		description: String!
		instructions: String!
		createdDate: String
		likes: Int
		username: String
	}

	type User {
		username: String!
		password: String!
		email: String!
		joinDate: String
		favorites: [Recipe]
	}
`;
