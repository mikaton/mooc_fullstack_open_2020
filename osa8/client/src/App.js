import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql, useQuery, useMutation } from '@apollo/client';

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`;

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');

  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors result={authors} show={page === 'authors'} />

      <Books result={books} show={page === 'books'} />

      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  );
};

export default App;
