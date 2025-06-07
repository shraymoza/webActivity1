import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './productReducer';

const root = combineReducers({ products: productReducer });
export const store = createStore(root, applyMiddleware(thunk));
