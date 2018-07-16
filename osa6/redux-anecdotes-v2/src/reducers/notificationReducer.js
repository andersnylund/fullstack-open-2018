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

export const notify = (message, isError) => {
	return {
		type: 'NOTIFY',
		message,
		isError
	};
};

export default reducer;