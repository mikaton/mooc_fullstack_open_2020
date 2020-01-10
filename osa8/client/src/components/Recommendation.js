import React from 'react';

const Recommendation = props => {
  if (!props.show) return null;

  if (props.result.loading || props.user.loading) return <div>loading...</div>;
  if (props.result.error || props.user.error)
    return (
      <div style={{ color: 'red' }}>
        {props.result.error.message}
        {props.user.error}
      </div>
    );

  const user = props.user.data.me;

  return (
    <div>
      {props.user.data && (
        <div>
          <h2>recommendations</h2>
          <p>
            books in your favorite genre <b>{user.favoriteGenre}</b>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {props.result.data.allBooks
                .filter(book => book.genres.includes(user.favoriteGenre))
                .map(book => (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
