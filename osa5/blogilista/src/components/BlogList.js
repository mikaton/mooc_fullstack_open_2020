import React from 'react';
import Blog from './Blog';

function BlogList({
  user,
  blogs,
  setBlogs,
  handleLogout,
  setErrorMessage,
  setSuccessMessage,
}) {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      ))}
    </div>
  );
}

export default BlogList;
