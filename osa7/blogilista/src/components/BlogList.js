import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledLink = styled(Link)`
  color: #e53e3e;
  text-decoration: none;
`;

const StyledDiv = styled.div`
  border: 1px solid #e2e8f0;
  padding: 0.5em;
`;

function BlogList(props) {
  return (
    <div>
      <h2>blogs</h2>
      {props.blogs.map(blog => (
        <StyledDiv key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </StyledLink>
        </StyledDiv>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(BlogList);
