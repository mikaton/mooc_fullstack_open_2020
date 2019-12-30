import React from 'react';
import { connect } from 'react-redux';

const Message = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div>{props.message ? <div style={style}>{props.message}</div> : null}</div>
  );
};

const mapStateToProps = state => {
  return {
    message: state.message,
  };
};

export default connect(mapStateToProps)(Message);
