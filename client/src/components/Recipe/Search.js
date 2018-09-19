import React, { Component } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';

import { SEARCH_RECIPES } from '../../queries/index';

import RecipeItem from './RecipeItem';

class Search extends Component {
	state = {
		searchResults: [],
	};

	handleChange = searchResults => this.setState({ searchResults });

	render() {
		const { searchResults } = this.state;

		return (
			<ApolloConsumer>
				{client => {
					return (
						<div className="App">
							<input
								type="search"
								onChange={async e => {
									e.persist();

									const {
										data: { searchRecipes },
									} = await client.query({
										query: SEARCH_RECIPES,
										variables: { searchTerm: e.target.value.trim() },
									});

									return this.handleChange(searchRecipes);
								}}
								name="search"
								place="Search for Recipes"
							/>
							<ul>
								{searchResults.map(recipe => {
									console.log(recipe);
									return <RecipeItem showLikes {...recipe} key={recipe.id} />;
								})}
							</ul>
						</div>
					);
				}}
			</ApolloConsumer>
		);
	}
}

export default Search;
