import React from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../queries/index';

import './App.css';
import RecipeItem from './Recipe/RecipeItem';

const App = () => (
	<div className="App">
		<h1>Home</h1>
		<Query query={GET_ALL_RECIPES}>
			{({ data, loading, error }) => {
				if (loading) {
					return <p>Loading...</p>;
				}
				if (error) {
					return <p>'ERROR'</p>;
				}
				console.log(data);
				return (
					<ul>
						{data.getAllRecipes.map(recipe => (
							<RecipeItem key={recipe.id} {...recipe} />
						))}
					</ul>
				);
			}}
		</Query>
	</div>
);

export default App;
