import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { REGISTER_USER } from '../../queries/index';
import Error from '../Error';

const initialState = {
	username: '',
	email: '',
	password: '',
	password2: '',
};

export default class Register extends Component {
	static propTypes = {};

	state = { ...initialState };

	clearState = () => this.setState({ ...initialState });

	onChange = e => {
		const { name, value } = e.target;
		return this.setState({ [name]: value });
	};

	onSubmit = async (e, cb) => {
		e.preventDefault();
		try {
			const { data } = await cb();
			localStorage.setItem('token', data.registerUser.token);
			return this.clearState();
		} catch (err) {
			console.log(err);
		}
	};

	validateForm = () => {
		const { username, email, password, password2 } = this.state;
		return !username || !email || !password || password !== password2;
	};

	render() {
		const { username, email, password, password2 } = this.state;

		return (
			<div className="App">
				<h2>Register</h2>
				<Mutation mutation={REGISTER_USER} variables={{ username, email, password }}>
					{(registerUser, { data, loading, error }) => {
						return (
							<form
								action=""
								className="form"
								onSubmit={e => this.onSubmit(e, registerUser)}
							>
								<input
									type="text"
									name="username"
									value={username}
									onChange={this.onChange}
									placeholder="Username"
								/>
								<input
									type="email"
									name="email"
									value={email}
									onChange={this.onChange}
									placeholder="Email"
								/>
								<input
									type="password"
									name="password"
									value={password}
									onChange={this.onChange}
									placeholder="Password"
								/>
								<input
									type="password"
									name="password2"
									value={password2}
									onChange={this.onChange}
									placeholder="Confirm password"
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
						);
					}}
				</Mutation>
			</div>
		);
	}
}
