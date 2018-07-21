import anecdoteService from '../services/anecdoteService';

const reducer = (store = [], action) => {
	if (action.type === 'VOTE') {
		const filtered = store.filter(a => a.id !== action.anecdote.id);
		return [ ...filtered, action.anecdote ];
	}
	if (action.type === 'CREATE') {
		return [ ...store, action.anecdote ];
	}
	if (action.type === 'INIT') {
		return [ ...action.anecdotes ];
	}
	return store;
};

export const vote = (anecdote) => {
	return {
		type: 'VOTE',
		anecdote
	};
};

export const createAnecdote = (anecdote) => {
	return {
		type: 'CREATE',
		anecdote
	};
};

export const initAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: 'INIT',
			anecdotes
		});
	};
};

export default reducer;