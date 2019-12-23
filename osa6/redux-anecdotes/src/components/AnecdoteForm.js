import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    store.dispatch(createAnecdote(content));
    store.dispatch(setNotification(`Added anecdote '${content}'`));
    setTimeout(() => {
      store.dispatch(setNotification(null));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
