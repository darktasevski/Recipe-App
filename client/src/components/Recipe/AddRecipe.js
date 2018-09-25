import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries/index';
import withAuth from '../Auth/withAuth';

import Error from '../Error';

class AddRecipe extends Component {
	state = {
		name: '',
		category: 'Breakfast',
		description: '',
		instructions: '',
		username: '',
		imageUrl: '',
	};

	async componentDidMount() {
		const username = await this.props.session.getCurrentUser.username;
		this.setState({ username });
	}

	clearState = () =>
		this.setState({
			name: '',
			category: 'Breakfast',
			description: '',
			instructions: '',
			username: '',
			imageUrl: '',
		});

	handleChange = e => {
		const { name, value } = e.target;

		return this.setState({ [name]: value });
	};

	handleInstChange = e => {
		const newContent = e.editor.getData();

		this.setState({ instructions: newContent });
	};

	handleSubmit = async (e, addRecipe) => {
		e.preventDefault();
		const { data } = await addRecipe();
		this.clearState();
		this.props.history.push('/');
	};

	validateForm = () => {
		// Optimistic UI optimization
		const { name, imageUrl, category, description, instructions } = this.state;
		return !name || !imageUrl || !category || !description || !instructions;
	};

	updateCache = (InMemoryCache, { data: { addRecipe } }) => {
		const { getAllRecipes } = InMemoryCache.readQuery({ query: GET_ALL_RECIPES });
		InMemoryCache.writeQuery({
			query: GET_ALL_RECIPES,
			data: { getAllRecipes: [addRecipe, ...getAllRecipes] },
		});
	};

	render() {
		const { name, category, description, instructions, username, imageUrl } = this.state;
		return (
			<Mutation
				mutation={ADD_RECIPE}
				variables={{ ...this.state }}
				refetchQueries={() => [{ query: GET_USER_RECIPES, variables: { username } }]}
				update={this.updateCache}
			>
				{(addRecipe, { data, loading, error }) => (
					<div className="App">
						<h2>Add recipe</h2>

						<form
							action="/"
							className="form"
							onSubmit={e => this.handleSubmit(e, addRecipe)}
						>
							<input
								type="text"
								name="name"
								value={name}
								onChange={this.handleChange}
								placeholder="Recipe name"
							/>
							<input
								type="text"
								name="imageUrl"
								value={imageUrl}
								onChange={this.handleChange}
								placeholder="Recipe image"
							/>
							<select
								value={category}
								name="category"
								id="category"
								onChange={this.handleChange}
							>
								<option value="Breakfast">Breakfast</option>
								<option value="Lunch">Lunch</option>
								<option value="Snack">Snack</option>
								<option value="Dinner">Dinner</option>
							</select>
							<textarea
								name="description"
								id="description"
								rows="5"
								value={description}
								onChange={this.handleChange}
								placeholder="Recipe description "
							/>
							<label htmlFor="instructions">Recipe instructions</label>
							<CKEditor
								name="instructions"
								content={instructions}
								events={{ change: this.handleInstChange }}
							/>
							<button
								disabled={loading || this.validateForm()}
								type="submit"
								className="button-primary"
							>
								Submit
							</button>
							{error && <Error error={error} />}
						</form>
					</div>
				)}
			</Mutation>
		);
	}
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));
