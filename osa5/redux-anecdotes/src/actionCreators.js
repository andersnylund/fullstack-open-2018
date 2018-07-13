export default {
  
  voting(anecdote) {
    return {
      type: 'VOTE',
      data: anecdote
    };
  },

  submitting(anecdote) {
    return {
      type: 'NEW',
      data: anecdote
    }
  }

}