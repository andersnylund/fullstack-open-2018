import React from 'react';
import PropTypes from 'prop-types';
import actionFor from '../actionCreators';

class AnecdoteForm extends React.Component {
  
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  newAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    this.context.store.dispatch(actionFor.submitting(newAnecdote));
    event.target.anecdote.value = '';
  };

  render() {
    return (
      <form onSubmit={this.newAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button> 
      </form>
    );
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object,
};

export default AnecdoteForm;