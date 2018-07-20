import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

class AnecdoteForm extends React.Component {
	handleSubmit = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		const response = await anecdoteService.create(content);
		this.props.createAnecdote(response);
		this.props.notify(`You added anecdote '${content}'`, false);
		setTimeout(() => {
			this.props.notify(null, false);
		}, 5000);
		e.target.anecdote.value = '';
	}

	render() {
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
