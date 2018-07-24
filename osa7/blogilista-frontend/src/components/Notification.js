import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, isError }) => {
	if (message === null) {
		return null;
	}

	return (
		<div className={isError ? 'error' : 'info'}>
			{message}
		</div>
	);
};

Notification.propTypes = {
	message: PropTypes.any,
	isError: PropTypes.bool.isRequired
};

export default Notification;
