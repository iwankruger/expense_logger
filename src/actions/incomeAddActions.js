import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE,
    INCOME_GROSS_UPDATED,
    INCOME_TAX_UPDATED,
    INCOME_UIF_UPDATED,
    INCOME_OTHER_TAX_UPDATED,
    INCOME_AFTER_TAX_UPDATED,
    CATEGORY_UPDATE_INCOME,
    EXPENSES_SYNCHRONISED
} from './types';
import Moment from 'moment';

export const categoryUpdateIncome = (category) => {
    return {
        type: CATEGORY_UPDATE_INCOME,
        payload: category
    };
};

export const incomeGrossUpdate = (grossAmount) => {
    console.log('INCOME ACTION ', grossAmount);
    return {
        type: INCOME_GROSS_UPDATED,
        payload: grossAmount
    };
};

export const incomeTaxUpdate = (taxAmount) => {
    console.log('INCOME ACTION ', taxAmount);
    return {
        type: INCOME_TAX_UPDATED,
        payload: taxAmount
    };
};

export const incomeUifUpdate = (uifAmount) => {
    console.log('INCOME ACTION ', uifAmount);
    return {
        type: INCOME_UIF_UPDATED,
        payload: uifAmount
    };
};

export const incomeOtherTaxUpdate = (otherTaxAmount) => {
    console.log('INCOME ACTION ', otherTaxAmount);
    return {
        type: INCOME_OTHER_TAX_UPDATED,
        payload: otherTaxAmount
    };
};

export const incomeAfterTaxUpdate = (afterTaxAmount) => {
    console.log('INCOME ACTION ', afterTaxAmount);
    return {
        type: INCOME_AFTER_TAX_UPDATED,
        payload: afterTaxAmount
    };
};


export const incomeAdd = ({ date, category, categoryId, description, 
    grossAmount, taxAmount, uifAmount,
    otherTaxAmount, afterTaxAmount }) => {

    console.log('ACTION ADD date ', date);
    console.log('ACTION ADD expense ', category);
    console.log('categoryId ', categoryId);
    console.log('description ', description);
    console.log('grossAmount ', grossAmount);
    console.log('taxAmount ', taxAmount);
    console.log('uifAmount ', uifAmount);
    console.log('otherTaxAmount ', otherTaxAmount);
    console.log('afterTaxAmount ', afterTaxAmount);
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
                incomeGrossAmount: grossAmount,
                type: 'income'
            };

            if (taxAmount) transactionData['taxAmount'] = taxAmount; 
            if (uifAmount) transactionData['uifAmount'] = uifAmount; 
            if (otherTaxAmount) transactionData['otherTaxAmount'] = otherTaxAmount; 
            if (afterTaxAmount) transactionData['afterTaxAmount'] = afterTaxAmount; 


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
            Actions.income();

            dispatch({ type: EXPENSES_SYNCHRONISED, payload: false });
            
        } catch (e) {
            console.log(e);
        }
    };
};

