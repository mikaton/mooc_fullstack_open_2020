import React from 'react';
import { setMessage } from '../reducers/messageReducer';
import { updateBlog, deleteBlog, commentBlog } from '../reducers/blogReducer';
import { connect } from 'react-redux';
import { useField } from '../hooks';

const Blog = props => {
  const comment = useField('text');
  const resetExcluded = ({ reset, ...rest }) => rest;
  /*const isUserAddedBlog = props.user.username === props.blog.user.username;
  const showIfUserAddedBlog = { display: isUserAddedBlog ? '' : 'none' }; */
  if (props.blog === undefined) return null;

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
  /*
  const handleDelete = async () => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)
    ) {
      try {
        props.deleteBlog(props.blog.id);
        props.setMessage(`Successfully deleted blog ${props.blog.title}`, 5);
      } catch (exception) {
        props.setMessage(`Error: ${exception.message}`, 5);
      }
    }
  }; */

  const handleComment = async event => {
    event.preventDefault();

    try {
      props.commentBlog(props.blog, comment.value);
      comment.reset();
    } catch (exception) {
      props.setMessage('Error: ', exception.message);
    }
  };

  return (
    <div>
      <h1>
        {props.blog.title} {props.blog.author}
      </h1>
      <a href={props.blog.url}>{props.blog.url}</a>
      <p>
        {props.blog.likes} likes <button onClick={handleLike}>like</button>
      </p>

      <p>added by {props.blog.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input {...resetExcluded(comment)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {props.blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.activeUser,
    blog: ownProps.blog,
  };
};

export default connect(mapStateToProps, {
  setMessage,
  updateBlog,
  deleteBlog,
  commentBlog,
})(Blog);
