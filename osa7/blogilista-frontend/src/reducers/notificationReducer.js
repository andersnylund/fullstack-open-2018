const initialState = {
	message: null,
	isError: false
};

const reducer = (store = initialState, action) => {
	if (action.type === 'NOTIFY') {
    return {
      message: action.message,
      isError: action.isError
    };
	}

	return store;
};

export const notify = (message, isError) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message,
      isError
    });
    setTimeout(() => { dispatch({
      type: 'NOTIFY',
      message: null,
      isError: false
    })}, 5000);
  };
}

export default reducer;