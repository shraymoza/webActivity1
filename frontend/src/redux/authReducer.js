import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_REQUEST,    LOGIN_SUCCESS,    LOGIN_FAIL,
    LOGOUT,
} from './authTypes';

const tokenFromStorage = localStorage.getItem('token');

const initial = {
    loading : false,
    user    : null,
    token   : tokenFromStorage,
    error   : null,
};

export const authReducer = (state = initial, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT:
            return { ...initial, token: null };

        default:
            return state;
    }
};
