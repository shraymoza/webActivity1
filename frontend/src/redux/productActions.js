import axios from 'axios';
import {
    CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAIL,
    READ_REQUEST,   READ_SUCCESS,   READ_FAIL,
    UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL,
    DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL,
} from './productTypes';

const api = axios.create({ baseURL: 'http://localhost:4000/api' });

export const fetchProducts = () => async dispatch => {
    dispatch({ type: READ_REQUEST });
    try {
        const { data } = await api.get('/products');
        dispatch({ type: READ_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: READ_FAIL, payload: err.message });
    }
};

export const createProduct = body => async dispatch => {
    dispatch({ type: CREATE_REQUEST });
    try {
        const { data } = await api.post('/products', body);
        dispatch({ type: CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CREATE_FAIL, payload: err.response?.data?.message || err.message });
    }
};

/* updateProduct & deleteProduct follow the same pattern */
