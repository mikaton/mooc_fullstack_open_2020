import React from 'react';
import { connect } from 'react-redux';
const style = {
  textAlign: 'right',
};
const UsersOverviewTable = props => (
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
          <tr>
            <td>{user.name}</td>
            <td style={style}>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(UsersOverviewTable);
