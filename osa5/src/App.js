import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div className="App">
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  );
}

export default App;
