import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = props => {
  const anecdotesToShow = () => {
    if (props.filter === '') {
      return props.anecdotes;
    }
    return props.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
    );
  };

  const vote = anecdote => {
    props.voteAnecdote(anecdote.id);
    props.setNotification(`you voted '${anecdote.content}'`);
    setTimeout(() => {
      props.setNotification(null);
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

const ConnectedAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdote;
