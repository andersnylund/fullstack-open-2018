import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
	handleSubmit = async (event) => {
		event.preventDefault();
		event.persist(); // https://reactjs.org/docs/events.html#event-pooling
		const content = event.target.anecdote.value;
		this.props.createAnecdote(content);
		this.props.notify(`You added anecdote '${content}'`, false);
		setTimeout(() => {
			this.props.notify(null, false);
		}, 5000);
		event.target.anecdote.value = '';
	}

	render() {
		return (
			<div>
				<h2>create new</h2>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div><input name='anecdote'/></div>
					<button>create</button>
				</form>
			</div>
		);
	}
}

export default connect(
	null,
	{ createAnecdote, notify }
)(AnecdoteForm);
