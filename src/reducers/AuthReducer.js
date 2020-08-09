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
    console.log('AuthReducer ', action);
    switch (action.type) {
        case EMAIL_CHANGED:
            console.log('reducer email changed');
            // must return a new object
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED: 
            console.log('reducer password changed');
            // must return a new object
            return { ...state, password: action.payload }; 
        case LOGIN_USER_SUCCESS: 
            // must return a new object
            return { ...state, ...INITIAL_STATE, user: action.payload };  
        case LOGIN_USER_FAIL: 
            console.log('DEBUG 1');
            // must return a new object
            return { ...state, error: 'Authentication Failed', loading: false };
        case LOGIN_USER:
            return { ...state, error: '', loading: true };
        default:
            return state;
    }
};
