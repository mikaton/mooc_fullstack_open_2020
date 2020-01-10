import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import LoginForm from './components/LoginForm';

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
    }
  }
`;

const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
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
      author {
        name
        born
      }
      genres
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [login] = useMutation(LOGIN);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('login');
  };

  const buttonsLoggedOut = () => (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('login')}>log in</button>
    </div>
  );

  const buttonsLoggedIn = () => (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => logout()}>log out</button>
    </div>
  );

  return (
    <div>
      <div>{!token ? buttonsLoggedOut() : buttonsLoggedIn()}</div>

      <Authors
        result={authors}
        editAuthor={editAuthor}
        show={page === 'authors'}
      />
      <Books result={books} show={page === 'books'} />

      <LoginForm
        login={login}
        logout={logout}
        setToken={token => setToken(token)}
        setPage={() => setPage('authors')}
        show={page === 'login'}
      />

      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  );
};

export default App;
