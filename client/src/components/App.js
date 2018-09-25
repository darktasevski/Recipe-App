import React, { Component } from 'react';
import { Query } from 'react-apollo';
import posed from 'react-pose';

import { GET_ALL_RECIPES } from '../queries/index';

import './App.css';
import RecipeItem from './Recipe/RecipeItem';
import Spinner from './Spinner';

const RecipeList = posed.ul({
	visible: {
		x: '0%',
		staggerChildren: 100,
	},
	hidden: {
		x: '-100%',
	},
});

class App extends Component {
	state = {
		on: false,
	};

	componentDidMount() {
		setTimeout(this.slideIn, 200);
	}

	slideIn = () => this.setState({ on: !this.state.on });

	render() {
		return (
			<div className="App">
				<h1 className="main-title">
					Find Recipes You <strong>Love</strong>
				</h1>
				<Query query={GET_ALL_RECIPES}>
					{({ data, loading, error }) => {
						if (loading) {
							return <Spinner />;
						}
						if (error) {
							return <p>'ERROR'</p>;
						}
						return (
							<RecipeList
								pose={this.state.on ? 'visible' : 'hidden'}
								className="cards"
							>
								{data.getAllRecipes.map(recipe => (
									<RecipeItem key={recipe.id} {...recipe} />
								))}
							</RecipeList>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default App;
