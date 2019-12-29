import React from 'react';
import Blog from './Blog';

function BlogList({ user, blogs, setBlogs, handleLogout }) {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog => (
        <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} />
      ))}
    </div>
  );
}

export default BlogList;
