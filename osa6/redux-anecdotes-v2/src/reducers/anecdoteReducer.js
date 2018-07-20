const reducer = (store = [], action) => {
	if (action.type === 'VOTE') {
		const old = store.filter(a => a.id !== action.id);
		const voted = store.find(a => a.id === action.id);

		return [ ...old, { ...voted, votes: voted.votes + 1 } ];
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
		id: anecdote.id
	};
};

export const createAnecdote = (anecdote) => {
	return {
		type: 'CREATE',
		anecdote
	};
};

export const initAnecdotes = (anecdotes) => {
	return {
		type: 'INIT',
		anecdotes
	};
};

export default reducer;