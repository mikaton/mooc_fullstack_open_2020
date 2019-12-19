import React, { useState } from "react";

import blogService from "../services/blogs";

function AddBlogForm({ blogs, setBlogs, setSuccessMessage, setErrorMessage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const handleAddBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const result = await blogService.create(newBlog);
      setSuccessMessage(`a new blog ${result.title} by ${result.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setBlogs(blogs.concat(result));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type="submit">create</button>
        </form>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  );
}

export default AddBlogForm;
