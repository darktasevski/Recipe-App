import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import './index.css';
import AppRouter from './routes';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
	uri: 'http://localhost:5050/graphql',
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppRouter />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
