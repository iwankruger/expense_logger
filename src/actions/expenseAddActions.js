import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE
} from './types';
import Moment from 'moment';

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
    console.log('categoryId ', categoryId);
    console.log('description ', description);
    console.log('value ', value);
    //date = `${date} ${Moment().format('hh:mm:ss.SSS [GMT]ZZ')}`; 
    console.log(date);

    

    return async (dispatch) => {
        try {
            // get user login
            let loginData = await AsyncStorage.getItem('loginData');
            loginData = JSON.parse(loginData);
            const login = loginData.login;

            // check if login is available
            if (!login) throw new Error('Login missing');

            const transactionData = {
                userId: login,
                date: `${date} ${Moment().format('hh:mm:ss.SSS [GMT]ZZ')}`,
                category,
                categoryId,
                description,
                value
            };

            console.log('transactionData ', transactionData);

            // get stored transactions to upload/sync
            let transactionUpload = await AsyncStorage.getItem('transactionUpload');
            
            // decode transactions
            transactionUpload = transactionUpload ? JSON.parse(transactionUpload) : [];
            
            // add transaction
            transactionUpload.push(transactionData);
            // encode transactions into a string
            transactionUpload = JSON.stringify(transactionUpload);

            console.log('transactions to upload ', transactionUpload);

            await AsyncStorage.setItem('transactionUpload', transactionUpload);     

            // go to main screen
            Actions.main();

            dispatch({ type: EXPENSE_ADD_SAVE, payload: { date, category, categoryId, description, value } });
            
        } catch (e) {
            console.log(e);
        }
    };
};

