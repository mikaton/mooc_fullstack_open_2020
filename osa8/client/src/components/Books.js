import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`;

const Books = props => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  if (loading) return <div>loading...</div>;
  if (error)
    return <div style={{ color: 'red' }}>{error.graphQLErrors[0].message}</div>;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
