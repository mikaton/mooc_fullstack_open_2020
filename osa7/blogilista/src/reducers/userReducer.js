import userService from '../services/users';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS':
      return action.data;
    case 'SET_USER':

    default:
      return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users,
    });
  };
};

export default userReducer;
