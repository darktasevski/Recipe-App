import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import './index.css';
import AppRouter from './routes';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
	uri: 'http://localhost:5050/graphql',
	fetchOptions: {
		credentials: 'include',
	},
	request(operation) {
		const token = localStorage.getItem('token');
		operation.setContext({
			headers: {
				authorization: token,
			},
		});
	},
	onError({ networkError, graphQLErrors }) {
		if (networkError) {
			console.log('Network error', networkError);
			if ((networkError.statusCode = 401)) {
				localStorage.removeItem('token');
			}
		} else if (graphQLErrors) {
			console.log('GraphQL error', graphQLErrors);
		}
	},
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppRouter />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
