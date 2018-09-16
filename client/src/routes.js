import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Nav from './components/Nav';
import Search from './components/Recipe/Search';

const AppRouter = ({ refetch }) => {
	return (
		<BrowserRouter>
			<Fragment>
				<Nav />
				<Switch>
					<Route exact path="/" component={App} />
					<Route exact path="/search" component={Search} />
					<Route path="/auth/register" render={() => <Register refetch={refetch} />} />
					<Route path="/auth/login" render={() => <Login refetch={refetch} />} />
					<Redirect to="/" />
				</Switch>
			</Fragment>
		</BrowserRouter>
	);
};

export default AppRouter;
