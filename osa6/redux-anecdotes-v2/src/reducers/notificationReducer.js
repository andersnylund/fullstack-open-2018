const initialNotification = {
	message: null,
	isError: false
};

const reducer = (store = initialNotification, action) => {

	if(action.type === 'NOTIFY') {
		return {
			message: action.message,
			isError: action.isError
		};
	}

	return store;
};

export const notify = (message, isError, timeout) => {
	return async (dispatch) => {
		dispatch({
			type: 'NOTIFY',
			message,
			isError
		});
		setTimeout(() => {
			dispatch({
				type: 'NOTIFY',
				message: null,
				isError: false
			});
		}, timeout * 1000);
	};
};

export default reducer;