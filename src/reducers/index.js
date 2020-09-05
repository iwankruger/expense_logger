import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ExpenseItemOverviewReducer from './ExpenseItemOverviewReducer';
import expenseAddReducer from './ExpenseAddReducer';
import incomeAddReducer from './IncomeAddReducer';

export default combineReducers({
    auth: AuthReducer,
    expenseItemOverviewReducer: ExpenseItemOverviewReducer,
    expenseAdd: expenseAddReducer,
    incomeAdd: incomeAddReducer
});
