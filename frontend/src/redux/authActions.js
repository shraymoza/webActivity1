import axios from 'axios';
import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT,
} from './authTypes';

export const api = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL || 'https://webactivity1.onrender.com'}/api`,
    timeout : 10000,
});

// Add token automatically
api.interceptors.request.use(cfg => {
    const token = localStorage.getItem('token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

// ───────── Register ─────────────────────────
export const register = body => async dispatch => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data }   = await api.post('/auth/register', body);   // { token, user }
        localStorage.setItem('token', data.token);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

// ───────── Login ────────────────────────────
export const login = creds => async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data }   = await api.post('/auth/login', creds);     // { token, user }
        localStorage.setItem('token', data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

// ───────── Logout ───────────────────────────
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};
