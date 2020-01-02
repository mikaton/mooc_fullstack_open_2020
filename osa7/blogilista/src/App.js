import React, { useEffect } from 'react';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import AddBlogForm from './components/AddBlogForm';
import Message from './components/Message';
import UsersOverviewTable from './components/UsersOverviewTable';

import { connect } from 'react-redux';
import { setMessage } from './reducers/messageReducer';
import { initBlogs } from './reducers/blogReducer';
import { initUsers } from './reducers/userReducer';
import { setActiveUser } from './reducers/loginReducer';

import { useField } from './hooks';

function App(props) {
  const username = useField('text');
  const password = useField('password');

  useEffect(() => {
    props.initBlogs();
    props.initUsers();
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      props.setActiveUser(user);
    }
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
      props.setActiveUser(user);
      username.reset();
      password.reset();
    } catch (error) {
      props.setMessage('Wrong username or password', 5);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    props.setActiveUser(null);
  };

  return (
    <div className="App">
      {!props.activeUser ? (
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
          <AddBlogForm user={props.activeUser} />
          <BlogList user={props.activeUser} handleLogout={handleLogout} />
          <UsersOverviewTable />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser,
  };
};

export default connect(mapStateToProps, {
  setMessage,
  initBlogs,
  initUsers,
  setActiveUser,
})(App);
