import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	return (
		<nav>
			<NavUnAuth />
		</nav>
	);
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
const NavAuth = () => ({});

export default Nav;
