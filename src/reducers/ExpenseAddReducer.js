import {
    CATEGORY_UPDATE
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
        default:
            return state;
    }
};