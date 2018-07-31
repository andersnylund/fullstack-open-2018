import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  notificationReducer,
  loginReducer,
  blogReducer,
  userReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
