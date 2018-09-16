import React, { Component } from 'react';

class AddRecipe extends Component {
	state = {
		name: '',
		category: '',
		description: '',
		instructions: '',
	};

	handleChange = e => {};

	render() {
		return (
			<div className="App">
				<h2>Add recipe</h2>

				<form action="/" className="form">
					<input
						type="text"
						name="name"
						onChange={this.handleChange}
						placeholder="Recipe name"
					/>
					<select name="category" id="category" onChange={this.handleChange}>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Snack">Snack</option>
						<option value="Dinner">Dinner</option>
					</select>
					<textarea
						name="description"
						id="description"
						rows="5"
						onChange={this.handleChange}
						placeholder="Recipe description "
					/>
					<textarea
						name="instructions"
						id="instructions"
						rows="5"
						onChange={this.handleChange}
						placeholder="Recipe instructions"
					/>
					<button type="submit" className="button-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default AddRecipe;
