import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NavigationMenu = props => {
  const navStyle = {
    padding: 5,
    backgroundColor: '#CBD5E0',
  };
  const linkStyle = {
    padding: 3,
  };

  return (
    <div style={navStyle}>
      <div>
        <Link style={linkStyle} to="/blogs">
          blogs
        </Link>
        <Link style={linkStyle} to="/users">
          users
        </Link>
        {props.user.name} logged in
        <button onClick={props.handleLogout}>logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.activeUser,
  };
};

export default connect(mapStateToProps)(NavigationMenu);
