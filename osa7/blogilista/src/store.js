import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/messageReducer';
import blogReducer from './reducers/blogReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
