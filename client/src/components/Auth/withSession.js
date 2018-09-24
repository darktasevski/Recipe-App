import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../../queries';

const withSession = Component => props => {
	return (
		<Query query={GET_CURRENT_USER}>
			{({ data, loading, refetch }) => {
				if (loading) return null;

				return <Component {...props} data={data} refetch={refetch} />;
			}}
		</Query>
	);
};

export default withSession;
