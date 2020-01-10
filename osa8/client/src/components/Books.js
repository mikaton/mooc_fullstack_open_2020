import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery, useApolloClient } from '@apollo/client';

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Books = props => {
  const [genre, setGenre] = useState('all genres');
  const [books, setBooks] = useState([]);
  const [getBooksByGenre, { loading, error, data }] = useLazyQuery(
    ALL_BOOKS_BY_GENRE
  );
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: ALL_BOOKS_BY_GENRE,
        variables: {
          genre: genre === 'all genres' ? null : genre,
        },
      })
      .then(result => {
        setBooks(result.data.allBooks);
      });
  }, [books, genre, client]);

  if (!props.show) {
    return null;
  }

  if (loading) return <div>loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;

  const handleSetGenre = async value => {
    if (!value) {
      setGenre('all genres');
    } else {
      setGenre(value);
    }

    await getBooksByGenre({ variables: { genre: value } });
    if (data) {
      setBooks(data.allBooks);
    }
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleSetGenre('refactoring')}>refactoring</button>
      <button onClick={() => handleSetGenre('agile')}>agile</button>
      <button onClick={() => handleSetGenre('patterns')}>patterns</button>
      <button onClick={() => handleSetGenre('design')}>design</button>
      <button onClick={() => handleSetGenre('crime')}>crime</button>
      <button onClick={() => handleSetGenre('classic')}>classic</button>
      <button onClick={() => handleSetGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
