import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Logout from './Auth/Logout';

const Nav = ({ currentUser }) => {
	return <nav>{currentUser ? <NavAuth currentUser={currentUser} /> : <NavUnAuth />}</nav>;
};

const NavUnAuth = () => (
	<ul>
		<li>
			<NavLink exact to="/">
				Home
			</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li>
			<NavLink to="/auth/login">Login</NavLink>
		</li>
		<li>
			<NavLink to="/auth/register">Register</NavLink>
		</li>
	</ul>
);
const NavAuth = ({ currentUser }) => (
	<Fragment>
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/search">Search</NavLink>
			</li>
			<li>
				<NavLink to="/recipe/add">Add Recipe</NavLink>
			</li>
			<li>
				<NavLink to="/profile">Profile</NavLink>
			</li>
			<li>
				<Logout />
			</li>
		</ul>
	</Fragment>
);

export default Nav;
