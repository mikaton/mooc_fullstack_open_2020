import React from 'react';

import Button from '../styled-components/Button';

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
      <Button primary type="submit">
        login
      </Button>
    </form>
  );
}

export default LoginForm;
