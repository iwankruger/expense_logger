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
    console.log('ADDDDD ', userData);
    console.log('ADDDDD ', transaction);
    if (!userData || !userData.expenseOverview || !Array.isArray(userData.expenseOverview)) return userData;
    
    const transactionDateMonth = Moment(new Date(transaction.date)).format('YYYY-MM-DD');
    
    for (let i = 0; i < userData.expenseOverview.length; i++) {
        console.log(i+' ',userData.expenseOverview[i]);
        if (userData.expenseOverview[i].categoryId == transaction.categoryId && transactionDateMonth == userData.expenseOverview[i].date) {
            userData.expenseOverview[i].total += parseFloat(transaction.expenseAmount);
            userData.expenseOverview[i].remaining = userData.expenseOverview[i].budget - userData.expenseOverview[i].total;
            console.log(userData);
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
        case SET_LOGIN:
            return { ...state, login: action.payload };
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
        case DATE_CHANGED:
            console.log('DATE REDUCER ', action.payload);
            return { ...state, date: action.payload };
        default:
            console.log('else');
            return state;
    }
};
