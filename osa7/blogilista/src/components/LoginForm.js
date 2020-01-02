import React from 'react';

function LoginForm({ username, password, handleLogin }) {
  const resetExcluded = ({ reset, ...rest }) => rest;
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...resetExcluded(username)} />
      </div>
      <div>
        password
        <input {...resetExcluded(password)} />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
