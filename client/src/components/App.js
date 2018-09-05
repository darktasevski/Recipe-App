import React from 'react';
import { Query } from 'react-apollo';
import './App.css';

import { getAllRecipes } from '../queries/index';

const App = () => (
	<div className="App">
		<h1>Home</h1>
		<Query query={getAllRecipes}>
			{({ data, loading, error }) => {
				if (loading) {
					return <p>Loading...</p>;
				}
				if (error) {
					return <p>{error}</p>;
				}
				return <p>Recipes</p>;
			}}
		</Query>
	</div>
);

export default App;
