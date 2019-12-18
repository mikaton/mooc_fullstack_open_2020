import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const updateData = {
      likes: blog.likes + 1,
    };
    await blogService.update(blog.id, updateData);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const blogDetails = () => (
    <div>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <button onClick={handleLike}>like</button>
      <button onClick={() => setShowBlogDetails(false)}>hide details</button>
    </div>
  );

  return (
    <div style={blogStyle}>
      {showBlogDetails && blogDetails()}
      {!showBlogDetails && (
        <div onClick={() => setShowBlogDetails(true)}>
          {blog.title} {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;
