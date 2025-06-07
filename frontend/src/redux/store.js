import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // This is the new, correct way
import { productReducer } from './productReducer';

const rootReducer = combineReducers({
    products: productReducer,  // ← key matches the slice name you use with useSelector
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
