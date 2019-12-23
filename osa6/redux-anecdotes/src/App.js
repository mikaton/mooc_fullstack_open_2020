import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer';

const App = props => {
  const store = props.store;

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => store.dispatch(voteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
