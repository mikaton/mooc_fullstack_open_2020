import React, { useState } from "react";

import blogService from "../services/blogs";

function AddBlogForm({ blogs, setBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const result = await blogService.create(newBlog);
      setBlogs(blogs.concat(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        title:{" "}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        author:{" "}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        url:{" "}
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AddBlogForm;
