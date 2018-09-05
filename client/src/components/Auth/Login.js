import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { LOGIN_USER } from '../../queries/index';
import Error from '../Error';

const initialState = {
	username: '',
	password: '',
};

export default class Login extends Component {
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
			localStorage.setItem('token', data.loginUser.token);
			return this.clearState();
		} catch (err) {
			console.log(err);
		}
	};

	validateForm = () => {
		const { username, password } = this.state;
		return !username || !password;
	};

	render() {
		const { username, password } = this.state;

		return (
			<div className="App">
				<h2>Login</h2>
				<Mutation mutation={LOGIN_USER} variables={{ username, password }}>
					{(loginUser, { data, loading, error }) => {
						return (
							<form
								action=""
								className="form"
								onSubmit={e => this.onSubmit(e, loginUser)}
							>
								<input
									type="text"
									name="username"
									value={username}
									onChange={this.onChange}
									placeholder="Username"
								/>

								<input
									type="password"
									name="password"
									value={password}
									onChange={this.onChange}
									placeholder="Password"
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
