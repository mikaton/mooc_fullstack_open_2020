import React from 'react';
import EditBirthyearForm from './EditBirthyearForm';

const Authors = props => {
  if (!props.show) {
    return null;
  }

  if (props.result.loading) return <div>loading...</div>;
  if (props.result.error)
    return (
      <div style={{ color: 'red' }}>
        {props.result.error.graphQLErrors[0].message}
      </div>
    );

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
          {props.result.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBirthyearForm
        editAuthor={props.editAuthor}
        authors={props.result.data.allAuthors}
      />
    </div>
  );
};

export default Authors;
