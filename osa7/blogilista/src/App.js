import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import AddBlogForm from './components/AddBlogForm';
import Message from './components/Message';
import UsersOverviewTable from './components/UsersOverviewTable';
import NavigationMenu from './components/NavigationMenu';
import User from './components/User';
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

  const userById = id => props.users.find(user => user.id === id);
  const blogById = id => props.blogs.find(blog => blog.id === id);

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
          <Router>
            <NavigationMenu
              user={props.activeUser}
              handleLogout={handleLogout}
            />
            <Message />
            <Route exact path="/blogs" render={() => <BlogList />} />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => <Blog blog={blogById(match.params.id)} />}
            />
            <Route exact path="/users" render={() => <UsersOverviewTable />} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User user={userById(match.params.id)} />}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <h2>Blog app</h2>
                  <AddBlogForm />
                </div>
              )}
            />
          </Router>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser,
    users: state.users,
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps, {
  setMessage,
  initBlogs,
  initUsers,
  setActiveUser,
})(App);
