import {
    CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAIL,
    READ_REQUEST,   READ_SUCCESS,   READ_FAIL,
    UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL,
    DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL,
} from './productTypes';

const init = { loading: false, error: null, items: [] };

export const productReducer = (state = init, action) => {
    switch (action.type) {
        case READ_REQUEST:
        case CREATE_REQUEST:
        case UPDATE_REQUEST:
        case DELETE_REQUEST:
            return { ...state, loading: true, error: null };

        case READ_SUCCESS:
            return { ...state, loading: false, items: action.payload };

        case CREATE_SUCCESS:
            return { ...state, loading: false, items: [action.payload, ...state.items] };

        case UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.map(p => (p.id === action.payload.id ? action.payload : p)),
            };

        case DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.filter(p => p.id !== action.payload),
            };

        case READ_FAIL:
        case CREATE_FAIL:
        case UPDATE_FAIL:
        case DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
