import React from 'react';
import Blog from './Blog';

import { connect } from 'react-redux';

function BlogList(props) {
  return (
    <div>
      <h2>blogs</h2>
      <p>{props.user.name} logged in</p>
      <button onClick={props.handleLogout}>logout</button>
      {props.blogs.map(blog => (
        <Blog key={blog.id} user={props.user} blog={blog} />
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
