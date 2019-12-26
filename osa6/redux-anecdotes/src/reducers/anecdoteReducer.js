import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const votedAnecdote = { ...action.data };

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

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
