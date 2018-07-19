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
		return (
			<div>
				<h2>Anecdotes</h2>
				{this.props.anecdotes.map(anecdote =>
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
		anecdotes: state.anecdotes
			.filter(a => a.content.toLowerCase().includes(state.filter))
			.sort((a, b) => b.votes - a.votes)
	};
};

export default connect(
	mapStateToProps,
	{ vote, notify }
)(AnecdoteList);
