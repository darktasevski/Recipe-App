import gql from 'graphql-tag';

export const recipeFragments = {
	recipe: gql`
		fragment CompleteRecipe on Recipe {
			name
			category
			description
			instructions
			likes
			createdDate
			id
			username
		}
	`,
	common: gql`
		fragment CommonRecipe on Recipe {
			id
			name
			likes
			category
		}
	`,
};
