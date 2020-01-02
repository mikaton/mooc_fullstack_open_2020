const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_USER':
      return action.data;
    default:
      return state;
  }
};

export const setActiveUser = user => {
  return dispatch => {
    dispatch({
      type: 'SET_ACTIVE_USER',
      data: user,
    });
  };
};

export default loginReducer;
