import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

function BlogList(props) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div>
      <h2>blogs</h2>
      {props.blogs.map(blog => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
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
