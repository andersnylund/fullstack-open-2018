const reducer = (store = [], action) => {
	if (action.type === 'VOTE') {
		const old = store.filter(a => a.id !== action.id);
		const voted = store.find(a => a.id === action.id);

		return [ ...old, { ...voted, votes: voted.votes + 1 } ];
	}
	if (action.type === 'CREATE') {
		return [ ...store, { content: action.content, id: 0, votes: 0 }];
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

export const createAnecdote = (content) => {
	return {
		type: 'CREATE',
		content
	};
};

export const initAnecdotes = (anecdotes) => {
	return {
		type: 'INIT',
		anecdotes
	};
};

export default reducer;