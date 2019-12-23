import React from 'react';

function LoginForm({ username, password, handleLogin }) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type='submit'>login</button>
    </form>
  );
}

export default LoginForm;
