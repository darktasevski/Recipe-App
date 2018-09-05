import gql from 'graphql-tag';

// Recipes queries
export const getAllRecipes = gql`
	query {
		getAllRecipes {
			name
			description
			instructions
			category
			likes
			createdDate
			id
			username
		}
	}
`;

// Recipes mutations

// User queries
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			joinDate
			username
			email
			id
		}
	}
`;

// User mutations

export const LOGIN_USER = gql`
	mutation($username: String!, $password: String!) {
		loginUser(username: $username, password: $password) {
			token
		}
	}
`;

export const REGISTER_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		registerUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;
