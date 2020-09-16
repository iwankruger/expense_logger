import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';
const INITIAL_STATE = { 
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            // must return a new object
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED: 
            // must return a new object
            return { ...state, password: action.payload }; 
        case LOGIN_USER_SUCCESS: 
            // must return a new object
            return { ...state, ...INITIAL_STATE, user: action.payload };  
        case LOGIN_USER_FAIL: 
            // must return a new object
            return { ...state, error: 'Authentication Failed', loading: false };
        case LOGIN_USER:
            return { ...state, error: '', loading: true };
        default:
            return state;
    }
};
