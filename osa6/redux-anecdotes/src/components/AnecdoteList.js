import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();

  const anecdotesToShow = () => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const vote = anecdote => {
    store.dispatch(voteAnecdote(anecdote.id));
    store.dispatch(setNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      store.dispatch(setNotification(null));
    }, 5000);
  };
  return (
    <div>
      {anecdotesToShow().map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
