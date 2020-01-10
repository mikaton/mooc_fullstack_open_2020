import React, { useState } from 'react';

const Books = props => {
  const [genre, setGenre] = useState('crime');
  if (!props.show) {
    return null;
  }

  if (props.result.loading) return <div>loading...</div>;
  if (props.result.error)
    return <div style={{ color: 'red' }}>{props.result.error.message}</div>;

  return (
    <div>
      <h2>books</h2>
      <p>in genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genre === 'all genres'
            ? props.result.data.allBooks.map(book => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))
            : props.result.data.allBooks
                .filter(book => book.genres.includes(genre))
                .map(book => (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
      <button onClick={() => setGenre('refactoring')}>refactoring</button>
      <button onClick={() => setGenre('agile')}>agile</button>
      <button onClick={() => setGenre('patterns')}>patterns</button>
      <button onClick={() => setGenre('design')}>design</button>
      <button onClick={() => setGenre('crime')}>crime</button>
      <button onClick={() => setGenre('classic')}>classic</button>
      <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  );
};

export default Books;
