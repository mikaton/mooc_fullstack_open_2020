import React, { useState } from 'react';
import { setMessage } from '../reducers/messageReducer';
import { updateBlog, deleteBlog } from '../reducers/blogReducer';
import { connect } from 'react-redux';

const Blog = props => {
  const [showBlogDetails, setShowBlogDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const isUserAddedBlog = props.user.username === props.blog.user.username;
  const showIfUserAddedBlog = { display: isUserAddedBlog ? '' : 'none' };

  const handleLike = async () => {
    try {
      const updateData = {
        likes: props.blog.likes + 1,
      };
      props.updateBlog(props.blog, updateData);
      props.setMessage(
        `You liked blog ${props.blog.title} by ${props.blog.author}`,
        5
      );
    } catch (exception) {
      props.setMessage(`Error: ${exception.message}`, 5);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)
    ) {
      try {
        await props.deleteBlog(props.blog.id);
        props.setMessage(`Successfully deleted blog ${props.blog.title}`, 5);
      } catch (exception) {
        props.setMessage(`Error: ${exception.message}`, 5);
      }
    }
  };

  const blogDetails = () => (
    <div>
      <button onClick={() => setShowBlogDetails(false)}>hide details</button>
      <p>{props.blog.title}</p>
      <a href={props.blog.url}>{props.blog.url}</a>
      <p>
        {props.blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {props.blog.user.name}</p>
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
          {props.blog.title} {props.blog.author}
        </div>
      )}
    </div>
  );
};

export default connect(null, { setMessage, updateBlog, deleteBlog })(Blog);
