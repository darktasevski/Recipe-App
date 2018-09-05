import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/auth/register" component={Register} />
				<Route path="/auth/login" component={Login} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
