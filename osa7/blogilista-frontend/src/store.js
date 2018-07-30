import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  notificationReducer,
  userReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
