import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const Logout = ({ history }) => {
	const handleLogout = (client, h) => {
		localStorage.setItem('token', '');
		client.resetStore();
		h.push('/');
	};

	return (
		<ApolloConsumer>
			{client => <button onClick={() => handleLogout(client, history)}>Logout</button>}
		</ApolloConsumer>
	);
};

export default withRouter(Logout);
