import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { GET_CURRENT_USER } from '../../queries/index';

const withAuth = conditionFunc => Component => props => {
	return (
		<Query query={GET_CURRENT_USER}>
			{({ data, loading }) => {
				if (loading) return null;

				return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/" />;
			}}
		</Query>
	);
};

withAuth.propTypes = {};

export default withAuth;
