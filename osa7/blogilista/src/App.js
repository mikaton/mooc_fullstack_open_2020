import React, { useState, useEffect } from 'react';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import AddBlogForm from './components/AddBlogForm';
import Message from './components/Message';

import { connect } from 'react-redux';
import { setMessage } from './reducers/messageReducer';
import { initBlogs } from './reducers/blogReducer';
import { useField } from './hooks';

function App(props) {
  const [user, setUser] = useState(null);

  const username = useField('text');
  const password = useField('password');

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    props.initBlogs();
  }, [props]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const credentials = {
        username: username.value,
        password: password.value,
      };
      const user = await loginService.login(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      username.reset();
      password.reset();
    } catch (error) {
      props.setMessage('Wrong username or password', 5);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className='App'>
      {!user ? (
        <div>
          <Message />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <Message />
          <AddBlogForm user={user} />
          <BlogList user={user} handleLogout={handleLogout} />
        </div>
      )}
    </div>
  );
}

export default connect(null, { setMessage, initBlogs })(App);
