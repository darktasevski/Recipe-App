import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import {
	GET_USER_RECIPES,
	DELETE_USER_RECIPE,
	GET_ALL_RECIPES,
	GET_CURRENT_USER,
} from '../../queries/index';

const handleDelete = async deleteUserRecipe => {
	const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
	if (confirmDelete) {
		const { data } = await deleteUserRecipe();
		console.log(data);
		return data;
	}
};

const UserRecipes = ({ username }) => {
	return (
		<Query query={GET_USER_RECIPES} variables={{ username }}>
			{({ data, loading, error }) => {
				if (loading) return <div>Loading...</div>;
				if (error) return <div>{error}</div>;
				return (
					<ul>
						<h5>Your recipes</h5>
						{!data.getUserRecipes.length && (
							<small>
								<strong>You haven't added any recipes yet.</strong>
							</small>
						)}
						{data.getUserRecipes.map(recipe => (
							<li key={recipe.id}>
								<Link to={`/recipe/${recipe.id}`}>
									<p>{recipe.name}</p>
								</Link>
								<p style={{ marginBottom: '10px' }}> {recipe.likes}</p>
								<Mutation
									mutation={DELETE_USER_RECIPE}
									variables={{ id: recipe.id }}
									refetchQueries={() => [
										{ query: GET_ALL_RECIPES },
										{ query: GET_CURRENT_USER },
									]}
									update={(cache, { data: { deleteUserRecipe } }) => {
										const { getUserRecipes } = cache.readQuery({
											query: GET_USER_RECIPES,
											variables: { username },
										});

										cache.writeQuery({
											query: GET_USER_RECIPES,
											variables: { username },
											data: {
												getUserRecipes: getUserRecipes.filter(
													r => r.id !== deleteUserRecipe.id
												),
											},
										});
									}}
								>
									{(deleteUserRecipe, attrs = {}) => {
										return (
											<p
												onClick={() => handleDelete(deleteUserRecipe)}
												className="delete-button"
											>
												{attrs.loading ? (
													'Deleting...'
												) : (
													<span>&times;</span>
												)}
											</p>
										);
									}}
								</Mutation>
							</li>
						))}
					</ul>
				);
			}}
		</Query>
	);
};

export default UserRecipes;
