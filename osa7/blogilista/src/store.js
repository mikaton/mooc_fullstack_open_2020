import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/messageReducer';

const store = createStore(messageReducer, applyMiddleware(thunk));

export default store;
