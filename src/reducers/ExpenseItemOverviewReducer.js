import {
    USER_DATA
} from '../actions/types';
const INITIAL_STATE = { 
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    console.log('ExpenseOverviewReducer ', action);
    switch (action.type) {
        case USER_DATA:
            console.log('reducer email changed');
            // must return a new object
            return { ...state, userData: action.payload };
        default:
            return state;
    }
};
