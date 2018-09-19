import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { GET_USER_RECIPES } from '../../queries/index';

const UserRecipes = ({ username }) => {
	return (
		<Query query={GET_USER_RECIPES} variables={{ username }}>
			{({ data, loading, error }) => {
				if (loading) return <div>Loading...</div>;
				if (error) return <div>{error}</div>;
				console.log(data);
				return (
					<ul>
						<h5>Your recipes</h5>
						{data.getUserRecipes.map(recipe => (
							<li key={recipe.id}>
								<Link to={`/recipe/${recipe.id}`}>
									<p>{recipe.name}</p>
								</Link>
								<p>{recipe.likes}</p>
							</li>
						))}
					</ul>
				);
			}}
		</Query>
	);
};

export default UserRecipes;
