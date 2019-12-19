import React, { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import AddBlogForm from "./components/AddBlogForm";
import Message from "./components/Message";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
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
      const user = await loginService.login({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const loginForm = () => {
    return (
      <div>
        <Message messageType="success" message={successMessage} />
        <Message messageType="error" message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  };

  return (
    <div className="App">
      {user === null && loginForm()}
      {user !== null && (
        <div>
          <Message messageType="success" message={successMessage} />
          <Message messageType="error" message={errorMessage} />
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
