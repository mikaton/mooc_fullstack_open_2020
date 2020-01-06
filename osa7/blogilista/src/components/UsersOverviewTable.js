import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TdAlignedToRight = styled.td`
  text-align: right;
`;
const StyledLink = styled(Link)`
  color: #e53e3e;
  text-decoration: none;
`;

const UsersOverviewTable = props => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => (
            <tr key={user.id}>
              <td>
                <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
              </td>
              <TdAlignedToRight>{user.blogs.length}</TdAlignedToRight>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(UsersOverviewTable);
