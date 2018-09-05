import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import './index.css';
import AppRouter from './routes';
import WithSession from './components/Auth/WithSession';
import client from './apollo.config';
import registerServiceWorker from './registerServiceWorker';

const AppWithSession = WithSession(AppRouter);

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppWithSession />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
