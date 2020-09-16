import Moment from 'moment';
import {
    USER_DATA,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED,
    DATE_CHANGED,
    SET_LOGIN
} from '../actions/types';
const INITIAL_STATE = { 
 
};




export default (state = INITIAL_STATE, action) => {
    let userDataCopy = null;
    let userData = null;

    switch (action.type) {
        case USER_DATA:
            // must return a new object
            return { ...state, userData: action.payload };
        default:
            return state;
    }
};