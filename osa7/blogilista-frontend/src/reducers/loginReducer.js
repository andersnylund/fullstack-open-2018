import loginService from '../services/loginService';

const initialState = {
  user: null,
  username: '',
  password: '',
};

const reducer = (store = initialState, action) => {
  if (action.type === 'LOGIN') {
    return {
      user: action.user,
      username: '',
      password: '',
    };
  } else if (action.type === 'LOGOUT') {
    return { ...initialState };
  } else if (action.type === 'CHANGE_LOGINFORM') {
    return { ...store, [ action.key ]: action.value };
  }
  return store;
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const result = await loginService.login({ username, password });
    window.localStorage.setItem('blogiListaUser', JSON.stringify(result));
    dispatch({
      type: 'LOGIN',
      user: result
    });
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      user,
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export const changeLoginFormValue = (key, value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_LOGINFORM',
      key,
      value,
    });
  };
};

export default reducer;