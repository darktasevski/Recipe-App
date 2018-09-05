import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';

const cache = new InMemoryCache({
	cacheRedirects: {
		Query: {
			recipe: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'Recipe', id }),
		},
	},
});

const request = async operation => {
	const token = await localStorage.getItem('token');
	operation.setContext({
		headers: {
			authorization: token,
		},
	});
};

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable(observer => {
			let handle;
			Promise.resolve(operation)
				.then(oper => request(oper))
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handle) handle.unsubscribe();
			};
		})
);

export default new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			if (networkError) {
				console.log(`[Network error]: ${networkError}`);
				// Logout user?
				// if ((networkError.statusCode = 401)) {
				// 	localStorage.removeItem('token');
				// }
			}
		}),
		requestLink,
		withClientState({
			defaults: {
				isConnected: true,
			},
			resolvers: {
				Mutation: {
					updateNetworkStatus: (_, { isConnected }, { cache }) => {
						cache.writeData({ data: { isConnected } });
						return null;
					},
				},
			},
			cache,
		}),
		new HttpLink({
			uri: 'http://localhost:5050/graphql',
			credentials: 'same-origin',
		}),
	]),
	cache: new InMemoryCache(),
});
