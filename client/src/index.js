import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import './index.css';
import AppRouter from './routes';
import withSession from './components/Auth/withSession';
import client from './apollo.config';
import registerServiceWorker from './registerServiceWorker';

const AppWithSession = withSession(AppRouter);

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppWithSession />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
