import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../styled-components/Button';

const NavigationMenu = props => {
  const Navigation = styled.div`
    background-color: #e53e3e;
    padding: 1em;
    color: #fff;
  `;
  const StyledLink = styled(Link)`
    color: #fff;
    margin: 5px;
    text-decoration: none;

    &:hover {
      background-color: #fff;
      color: #e53e3e;
    }
  `;
  const StyledUserDetails = styled.div`
    float: right;
  `;
  return (
    <Navigation>
      <StyledLink to="/blogs">blogs</StyledLink>
      <StyledLink to="/users">users</StyledLink>
      <StyledUserDetails>
        {props.user.name} logged in
        <Button primary onClick={props.handleLogout}>
          logout
        </Button>
      </StyledUserDetails>
    </Navigation>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.activeUser,
  };
};

export default connect(mapStateToProps)(NavigationMenu);
