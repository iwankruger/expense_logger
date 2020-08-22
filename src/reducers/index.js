import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ExpenseItemOverviewReducer from './ExpenseItemOverviewReducer';

export default combineReducers({
    auth: AuthReducer,
    expenseItemOverviewReducer: ExpenseItemOverviewReducer
});
