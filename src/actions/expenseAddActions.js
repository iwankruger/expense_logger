import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE
} from './types';

export const categoryUpdate = (category) => {
    console.log('ACTION ', category)
    return {
        type: CATEGORY_UPDATE,
        payload: category
    };
};

export const descriptionUpdate = (description) => {
    return {
        type: EXPENSE_ADD_DESCRIPTION_UPDATE,
        payload: description
    };
};

export const amountUpdate = (amount) => {
    return {
        type: EXPENSE_ADD_AMOUNT_UPDATE,
        payload: amount
    };
};

export const expenseAdd = ({date, category, categoryId, description, value}) => {
    console.log('ACTION ADD date ', date);
    console.log('ACTION ADD expense ', category);

    // todo save to local storage

    // go to main screen
    Actions.main();

    return {
        type: EXPENSE_ADD_SAVE,
        payload: { date, category, categoryId, description, value }
    };
};

