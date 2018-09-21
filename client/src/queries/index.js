import gql from 'graphql-tag';

// Recipes queries
export const GET_ALL_RECIPES = gql`
	query {
		getAllRecipes {
			id
			name
			category
		}
	}
`;

export const GET_RECIPE = gql`
	query($id: ID!) {
		getRecipe(id: $id) {
			name
			category
			description
			instructions
			likes
			createdDate
			id
			username
		}
	}
`;

export const SEARCH_RECIPES = gql`
	query($searchTerm: String) {
		searchRecipes(searchTerm: $searchTerm) {
			id
			name
			likes
			category
		}
	}
`;

export const GET_USER_RECIPES = gql`
	query($username: String!) {
		getUserRecipes(username: $username) {
			id
			name
			likes
			category
		}
	}
`;

// Recipes mutations

export const ADD_RECIPE = gql`
	mutation(
		$name: String!
		$description: String!
		$category: String!
		$instructions: String!
		$username: String
	) {
		addRecipe(
			name: $name
			description: $description
			category: $category
			instructions: $instructions
			username: $username
		) {
			name
			category
			description
			instructions
			likes
			createdDate
			id
			username
		}
	}
`;

export const DELETE_USER_RECIPE = gql`
	mutation($id: ID!) {
		deleteUserRecipe(id: $id) {
			id
		}
	}
`;

// User queries
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			joinDate
			username
			email
			id
			favorites {
				id
				name
			}
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
