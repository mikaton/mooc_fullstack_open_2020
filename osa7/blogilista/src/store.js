import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import messageReducer from './reducers/messageReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  activeUser: loginReducer,
  message: messageReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
