import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = props => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) return <div>loading...</div>;
  if (error)
    return <div style={{ color: 'red' }}>{error.graphQLErrors[0].message}</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
