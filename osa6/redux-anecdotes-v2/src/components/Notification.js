import React from 'react';

class Notification extends React.Component {

	render() {
		const style = {
			border: 'solid',
			padding: 10,
			borderWidth: 1
		};

		return this.props.store.getState().notification.message ?
			<div style={style}>
				{this.props.store.getState().notification.message}
			</div> : null;
	}
}

export default Notification;
