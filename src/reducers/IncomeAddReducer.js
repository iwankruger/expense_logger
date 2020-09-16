import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    INCOME_GROSS_UPDATED,
    INCOME_TAX_UPDATED,
    INCOME_UIF_UPDATED,
    INCOME_OTHER_TAX_UPDATED,
    INCOME_AFTER_TAX_UPDATED,
    CATEGORY_UPDATE_INCOME
} from '../actions/types';
const INITIAL_STATE = { 
    categorySelectedIncome: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_INCOME:
            return { ...state, categorySelectedIncome: action.payload };
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
