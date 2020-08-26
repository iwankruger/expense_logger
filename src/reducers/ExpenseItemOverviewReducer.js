import Moment from 'moment';
import {
    USER_DATA,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED
} from '../actions/types';
const INITIAL_STATE = { 
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    synchroniseStatus: null
};


const addTransaction = (userData, transaction) => {
    
    if (!userData || !userData.data || !Array.isArray(userData.data)) return userData;
    
    const transactionDateMonth = Moment(new Date(transaction.date)).format('YYYY-MM-DD');
    
    for (let i = 0; i < userData.data.length; i++) {
        if (userData.data[i].categoryId == transaction.categoryId && transactionDateMonth == userData.data[i].date) {
            console.log('MATCH');
            userData.data[i].total += parseFloat(transaction.value);
            userData.data[i].remaining = userData.data[i].budget - userData.data[i].total;
            break;
        }
    }
    return userData;


};

export default (state = INITIAL_STATE, action) => {
    console.log('ExpenseOverviewReducer1 ', action);
    console.log('state ', state);
    let userDataCopy = null;
    let userData = null;

    switch (action.type) {
        case USER_DATA:
            console.log('reducer email changed');
            // must return a new object
            return { ...state, userData: action.payload };
        case EXPENSE_ADD_SAVE:
            console.log('transaction added');
            console.log(action);
            // copy user data
            userDataCopy = JSON.parse(JSON.stringify(state.userData));
            // add transaction to state
            userData = addTransaction(userDataCopy, action.payload);
            console.log({ ...state, userData, synchroniseStatus: false });

            // must return a new object
            return { ...state, userData }; 
        case EXPENSES_SYNCHRONISED:
            //if (state.synchroniseStatus) { action.payload = false; }
            //else { action.payload = true; }

            return { ...state, synchroniseStatus: action.payload };
        default:
            console.log('else');
            return state;
    }
};
