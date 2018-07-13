import React from 'react';
import PropTypes from 'prop-types';
import actionFor from '../actionCreators';

class AnecdoteList extends React.Component {
  
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe((() => this.forceUpdate())); 
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  vote = (anecdote) => {
    this.context.store.dispatch(actionFor.voting(anecdote));
  };
  
  render() {
    return this.context.store.getState().map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => this.vote(anecdote)}>vote</button>
        </div>
      </div>
    ));
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
};

export default AnecdoteList;