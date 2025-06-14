import axios from 'axios';
import {
    CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAIL,
    READ_REQUEST,   READ_SUCCESS,   READ_FAIL,
    UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL,
    DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL,
} from './productTypes';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'https://webactivity1.onrender.com'}/api`,
    timeout: 10000,
});

export const fetchProducts = () => async dispatch => {
    dispatch({ type: READ_REQUEST });
    try {
        const { data } = await api.get('/products');
        dispatch({ type: READ_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: READ_FAIL, payload: err.message });
    }
};

// ── Create ─────────────────────────────────────────────────
export const createProduct = body => async dispatch => {
    dispatch({ type: CREATE_REQUEST });
    try {
        const { data } = await api.post('/products', body);
        dispatch({ type: CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: CREATE_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

// ── Update ─────────────────────────────────────────────────
export const updateProduct = (id, body) => async dispatch => {
    dispatch({ type: UPDATE_REQUEST });
    try {
        const { data } = await api.put(`/products/${id}`, body);
        dispatch({ type: UPDATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: UPDATE_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

// ── Delete ─────────────────────────────────────────────────
export const deleteProduct = id => async dispatch => {
    dispatch({ type: DELETE_REQUEST });
    try {
        await api.delete(`/products/${id}`);
        dispatch({ type: DELETE_SUCCESS, payload: id });
    } catch (err) {
        dispatch({
            type: DELETE_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};
