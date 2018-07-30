import loginService from '../services/login_service';

const initialState = {
  user: null,
  username: '',
  password: '',
};

const reducer = (store = initialState, action) => {
  if (action.type === 'LOGIN') {
    return { ...store, user: action.user };
  } else if (action.type === 'LOGOUT') {
    return { ...initialState };
  } else if (action.type === 'CHANGE_LOGINFORM') {
    return { ...store, [ action.key ]: action.value }
  }
  return store;
};

export const login = (username, password) => {
  return async (dispatch) => {
    const result = await loginService.login({ username, password });
    window.localStorage.setItem('blogiListaUser', JSON.stringify(result));
    dispatch({
      type: 'LOGIN',
      user: result
    });
  }
}

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      user,
    });
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    });
  }
}

export const changeFormValue = (key, value) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_LOGINFORM',
      key,
      value,
    });
  }
}

export default reducer;