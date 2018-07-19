import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		this.props.createAnecdote(content);
		this.props.notify(`You added anecdote '${content}'`, false);
		setTimeout(() => {
			this.props.notify(null, false);
		}, 5000);
		e.target.anecdote.value = '';
	}

	render() {

		console.log(this.props);

		return (
			<div>
				<h2>create new</h2>
				<form onSubmit={this.handleSubmit}>
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
