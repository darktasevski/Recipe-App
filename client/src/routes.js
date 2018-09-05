import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const AppRouter = ({ refetch }) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/auth/register" render={() => <Register refetch={refetch} />} />
				<Route path="/auth/login" render={() => <Login refetch={refetch} />} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
