import React from 'react';

const User = props => {
  if (props.user === undefined) return null;
  console.log(props.user);
  return (
    <div>
      <h1>{props.user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {props.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
