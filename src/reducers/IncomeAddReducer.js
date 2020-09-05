import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    INCOME_GROSS_UPDATED,
    INCOME_TAX_UPDATED,
    INCOME_UIF_UPDATED,
    INCOME_OTHER_TAX_UPDATED,
    INCOME_AFTER_TAX_UPDATED
} from '../actions/types';
const INITIAL_STATE = { 
    categorySelected: null
};

export default (state = INITIAL_STATE, action) => {
    console.log('IncomeAddReducer ', action);
    switch (action.type) {
        // case CATEGORY_UPDATE:
        //     console.log('reducer email changed');
        //     // must return a new object
        //     return { ...state, categorySelected: action.payload };
        // case EXPENSE_ADD_DESCRIPTION_UPDATE:
        //     return { ...state, description: action.payload };
        case INCOME_GROSS_UPDATED:
            return { ...state, grossAmount: action.payload };  
        case INCOME_TAX_UPDATED:
            return { ...state, taxAmount: action.payload };
        case INCOME_UIF_UPDATED:
            return { ...state, uifAmount: action.payload };
        case INCOME_OTHER_TAX_UPDATED:
            return { ...state, otherTaxAmount: action.payload };
        case INCOME_AFTER_TAX_UPDATED:
            return { ...state, afterTaxAmount: action.payload };
        default:
            return state;
    }
};
