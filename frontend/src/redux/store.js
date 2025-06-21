import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { productReducer } from './productReducer';
import { authReducer    } from './authReducer';

const rootReducer = combineReducers({
    products : productReducer,
    auth     : authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
