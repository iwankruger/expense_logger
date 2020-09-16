import Moment from 'moment';
import {
    USER_DATA,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED,
    DATE_CHANGED,
    SET_LOGIN
} from '../actions/types';
const INITIAL_STATE = { 
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    login: '',
    synchroniseStatus: null,
    date: Moment().format('YYYY-MM-01')
};


const addTransaction = (userData, transaction) => {
    if (!userData || !userData.expenseOverview || !Array.isArray(userData.expenseOverview)) return userData;
    
    const transactionDateMonth = Moment(new Date(transaction.date)).format('YYYY-MM-DD');
    
    for (let i = 0; i < userData.expenseOverview.length; i++) {
        if (userData.expenseOverview[i].categoryId == transaction.categoryId && transactionDateMonth == userData.expenseOverview[i].date) {
            userData.expenseOverview[i].total += parseFloat(transaction.expenseAmount);
            userData.expenseOverview[i].remaining = userData.expenseOverview[i].budget - userData.expenseOverview[i].total;
            break;
        }
    }
    return userData;


};

export default (state = INITIAL_STATE, action) => {
    let userDataCopy = null;
    let userData = null;

    switch (action.type) {
        case USER_DATA:
            // must return a new object
            return { ...state, userData: action.payload };
        case SET_LOGIN:
            return { ...state, login: action.payload };
        case EXPENSE_ADD_SAVE:
            // copy user data
            userDataCopy = JSON.parse(JSON.stringify(state.userData));
            // add transaction to state
            userData = addTransaction(userDataCopy, action.payload);

            // must return a new object
            return { ...state, userData }; 
        case EXPENSES_SYNCHRONISED:
            //if (state.synchroniseStatus) { action.payload = false; }
            //else { action.payload = true; }

            return { ...state, synchroniseStatus: action.payload };
        case DATE_CHANGED:
            return { ...state, date: action.payload };
        default:
            return state;
    }
};
