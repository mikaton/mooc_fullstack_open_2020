import React from 'react';
import styled from 'styled-components';

const StyledBlogList = styled.ul`
  list-style-type: none;
  font-style: italic;
  padding: 0;
`;

const User = props => {
  if (props.user === undefined) return null;
  return (
    <div>
      <h1>{props.user.name}</h1>
      <h2>added blogs</h2>
      <StyledBlogList>
        {props.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </StyledBlogList>
    </div>
  );
};

export default User;
