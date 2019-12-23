import React, { useState, useEffect } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import AddBlogForm from './components/AddBlogForm';
import Message from './components/Message';

import { useField } from './hooks';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
    blogService.getAll().then(initialBlogs => {
      initialBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(initialBlogs);
    });
  }, []);

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
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const loginForm = () => {
    return (
      <div>
        <Message messageType='success' message={successMessage} />
        <Message messageType='error' message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    );
  };

  return (
    <div className='App'>
      {!user ? (
        loginForm()
      ) : (
        <div>
          <Message messageType='success' message={successMessage} />
          <Message messageType='error' message={errorMessage} />
          <AddBlogForm
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
          <BlogList
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            handleLogout={handleLogout}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
