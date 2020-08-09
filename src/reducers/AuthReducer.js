import { EMAIL_CHANGED, PASSWORD_CHANGED } from '../actions/types';
const INITIAL_STATE = { 
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            console.log('reducer email changed');
            // must return a new object
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED: 
            console.log('reducer password changed');
            // must return a new object
            return { ...state, password: action.payload }; 
        default:
            return state;
    }
};
