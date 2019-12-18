import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogDetails = () => (
    <div onClick={() => setShowBlogDetails(false)}>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <button onClick={() => console.log(blog)}>like</button>
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
