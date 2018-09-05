import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
	return (
		<div>
			<p style={{ color: 'red' }}>{error.message}</p>
		</div>
	);
};

Error.propTypes = {
	error: PropTypes.shape({
		message: PropTypes.string.isRequired,
	}),
};

export default Error;
