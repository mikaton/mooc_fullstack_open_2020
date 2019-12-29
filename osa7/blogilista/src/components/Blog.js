import React, { useState } from 'react';
import blogService from '../services/blogs';
import { setMessage } from '../reducers/messageReducer';
import { connect } from 'react-redux';

const Blog = ({ user, blog, setBlogs }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const isUserAddedBlog = user.username === blog.user.username;
  const showIfUserAddedBlog = { display: isUserAddedBlog ? '' : 'none' };

  const handleLike = async () => {
    const updateData = {
      likes: blog.likes + 1,
    };
    try {
      await blogService.update(blog.id, updateData);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      //setMessage('Something went wrong', 5);
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const response = await blogService.remove(blog.id);
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        //setMessage('Something went wrong', 5);
        console.error(error);
      }
    }
  };

  const blogDetails = () => (
    <div>
      <button onClick={() => setShowBlogDetails(false)}>hide details</button>
      <p>{blog.title}</p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <div style={showIfUserAddedBlog}>
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  );

  return (
    <div style={blogStyle}>
      {showBlogDetails && blogDetails()}
      {!showBlogDetails && (
        <div className='blog' onClick={() => setShowBlogDetails(true)}>
          {blog.title} {blog.author}
        </div>
      )}
    </div>
  );
};

export default connect(null, { setMessage })(Blog);
