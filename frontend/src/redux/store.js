// src/redux/store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';      // ← fixed import
import rootReducer from './productReducer';   // adjust the path if your root reducer has a different name

// enable the Redux DevTools extension if it’s installed
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
