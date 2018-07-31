import userService from '../services/userService';

const reducer = (store = [], action) => {
  if (action.type === 'SET_USERS') {
    return action.users;
  }

  return store;
};

export const setUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers();
    dispatch({
      type: 'SET_USERS',
      users,
    });
  };
};

export default reducer;