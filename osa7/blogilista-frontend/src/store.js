import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';

const reducer = combineReducers({
  notificationReducer,
  userReducer,
  blogReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
