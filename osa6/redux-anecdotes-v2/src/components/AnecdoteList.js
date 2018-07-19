import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

class AnecdoteList extends React.Component {

	vote(anecdote) {
		this.props.vote(anecdote);
		this.props.notify(`You voted on '${anecdote.content}'`, false);
		setTimeout(() => {
			this.props.notify(null, false);
		}, 5000);
	}

	render() {
		const filter = this.props.filter;
		const anecdotes = this.props.anecdotes.filter(a => {
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

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		anecdotes: state.anecdotes
	};
};

export default connect(
	mapStateToProps,
	{ vote, notify }
)(AnecdoteList);
