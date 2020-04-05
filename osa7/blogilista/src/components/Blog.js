import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setMessage } from '../reducers/messageReducer';
import { updateBlog, deleteBlog, commentBlog } from '../reducers/blogReducer';
import { useField } from '../hooks';

const StyledLink = styled.a`
  color: #e53e3e;
  text-decoration: none;
`;

const StyledComments = styled.ul`
  list-style-type: none;
  font-style: italic;
  padding: 0;
`;

const StyledComment = styled.li`
  padding: 0.75em 0 0.75em 0;
  border: 0.5px solid #e2e8f0;
`;

const Blog = props => {
  const comment = useField('text');
  const resetExcluded = ({ reset, ...rest }) => rest;
  /* const isUserAddedBlog = props.user.username === props.blog.user.username;
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
        5,
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
      <StyledLink href={props.blog.url}>{props.blog.url}</StyledLink>
      <p>
        {props.blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>

      <p>
        added by
        {props.blog.user.name}
      </p>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input {...resetExcluded(comment)} />
        <button type="submit">add comment</button>
      </form>
      <StyledComments>
        {props.blog.comments.map(comment => (
          <StyledComment key={comment}>{comment}</StyledComment>
        ))}
      </StyledComments>
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
