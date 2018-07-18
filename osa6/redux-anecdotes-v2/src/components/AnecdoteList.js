import React from 'react';
import { vote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

class AnecdoteList extends React.Component {

	vote(anecdote) {
		this.props.store.dispatch(vote(anecdote));
		this.props.store.dispatch(notify(`You voted on '${anecdote.content}'`, false));
		setTimeout(() => {
			this.props.store.dispatch(notify(null, false));
		}, 5000);
	}

	render() {
		const filter = this.props.store.getState().filter;
		const anecdotes = this.props.store.getState().anecdotes.filter(a => {
			return a.content.toLowerCase().includes(filter);
		});
		return (
			<div>
				<h2>Anecdotes</h2>
				{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
              has {anecdote.votes}
							<button onClick={() => this.vote(anecdote)}>
                vote
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default AnecdoteList;
