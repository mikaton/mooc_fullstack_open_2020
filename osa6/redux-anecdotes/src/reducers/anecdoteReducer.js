const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find(anecdote => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state
        .map(anecdote => (anecdote.id !== id ? anecdote : votedAnecdote))
        .slice()
        .sort((a, b) => b.votes - a.votes);
    case 'CREATE_ANECDOTE':
      const newAnecdote = { ...action.data };
      return state.concat(newAnecdote);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = content => {
  return {
    type: 'CREATE_ANECDOTE',
    data: content,
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default reducer;
