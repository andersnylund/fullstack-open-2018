const initialFilterValue = '';

const reducer = (store = initialFilterValue, action) => {
	if (action.type === 'FILTER') {
		return action.filter.toLowerCase();
	}

	return store;
};

export const changeFilter = (filter) => {
	return {
		type: 'FILTER',
		filter
	};
};

export default reducer;