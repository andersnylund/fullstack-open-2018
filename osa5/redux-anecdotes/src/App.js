import React from 'react';
import PropTypes from 'prop-types';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

class App extends React.Component {

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteList />
        <h2>create new</h2>
        <AnecdoteForm />
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App