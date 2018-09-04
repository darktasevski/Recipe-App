import { gql } from 'apollo-boost';

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
