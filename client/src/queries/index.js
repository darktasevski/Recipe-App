import gql from 'graphql-tag';

import { recipeFragments } from './fragments';

// Recipes queries
export const GET_ALL_RECIPES = gql`
	query {
		getAllRecipes {
			...CommonRecipe
		}
	}
	${recipeFragments.common}
`;

export const GET_RECIPE = gql`
	query($id: ID!) {
		getRecipe(id: $id) {
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
	query($searchTerm: String) {
		searchRecipes(searchTerm: $searchTerm) {
			...CommonRecipe
		}
	}
	${recipeFragments.common}
`;

export const GET_USER_RECIPES = gql`
	query($username: String!) {
		getUserRecipes(username: $username) {
			...CommonRecipe
		}
	}
	${recipeFragments.common}
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
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
`;

export const DELETE_USER_RECIPE = gql`
	mutation($id: ID!) {
		deleteUserRecipe(id: $id) {
			id
		}
	}
`;

export const LIKE_RECIPE = gql`
	mutation($id: ID!, $username: String!) {
		likeRecipe(id: $id, username: $username) {
			id
			likes
		}
	}
`;

export const UNLIKE_RECIPE = gql`
	mutation($id: ID!, $username: String!) {
		unlikeRecipe(id: $id, username: $username) {
			id
			likes
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
