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
    console.log('IncomeOverviewReducer ', action);
    console.log('state ', state);
    let userDataCopy = null;
    let userData = null;

    switch (action.type) {
        case USER_DATA:
            console.log('reducer email changed');
            // must return a new object
            return { ...state, userData: action.payload };
        // case SET_LOGIN:
        //     return { ...state, login: action.payload };
        // case EXPENSE_ADD_SAVE:
        //     console.log('transaction added');
        //     console.log(action);
        //     // copy user data
        //     userDataCopy = JSON.parse(JSON.stringify(state.userData));
        //     // add transaction to state
        //     userData = addTransaction(userDataCopy, action.payload);
        //     console.log({ ...state, userData, synchroniseStatus: false });

        //     // must return a new object
        //     return { ...state, userData };
        default:
            console.log('else');
            return state;
    }
};