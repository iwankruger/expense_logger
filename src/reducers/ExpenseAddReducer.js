import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE
} from '../actions/types';
const INITIAL_STATE = { 
    categorySelected: null
};

export default (state = INITIAL_STATE, action) => {
    console.log('ExpenseAddReducer ', action);
    switch (action.type) {
        case CATEGORY_UPDATE:
            console.log('reducer email changed');
            // must return a new object
            return { ...state, categorySelected: action.payload };
        case EXPENSE_ADD_DESCRIPTION_UPDATE:
            return { ...state, description: action.payload };
        case EXPENSE_ADD_AMOUNT_UPDATE:
            return { ...state, amount: action.payload };    
        default:
            return state;
    }
};