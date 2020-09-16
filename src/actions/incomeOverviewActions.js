import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED,
    USER_DATA,
    DATE_CHANGED,
    USER_DATA_INCOME
} from './types';
import Moment from 'moment';
import * as config from '../../config';
import axios from 'axios';

export const synchroniseIncome = (date) => {

    return async (dispatch) => {
        try {
            
            let loginData = await AsyncStorage.getItem('loginData');
            loginData = JSON.parse(loginData);
            const loginToken = loginData.loginToken;
            const login = loginData.login;

            // get stored transactions to upload/sync
            let transactionUpload = await AsyncStorage.getItem('transactionUpload');

            // upload transactions
            if (transactionUpload) {
                transactionUpload = JSON.parse(transactionUpload);

                while (transactionUpload.length > 0) {
                    await addTransactions(loginToken, transactionUpload[0]);
                    transactionUpload.shift();
                }

                // save cleared transactions in memory
                transactionUpload = JSON.stringify(transactionUpload);
                await AsyncStorage.setItem('transactionUpload', transactionUpload);

                dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });
            }

            const userDataMonth = await getUserDataFromServer(login, loginToken, date);
            const userData = userDataFormat(userDataMonth.categories, userDataMonth.transactions);

            // get user data in storage
            let userDataLocal = await AsyncStorage.getItem('userDataLocal');

            if (userDataLocal) {
                userDataLocal = JSON.parse(userDataLocal);
            } else {
                userDataLocal = {};
            }

            userDataLocal.categories = userData.categories;
            userDataLocal.settings = userData.settings;
            userDataLocal[date] = userData.data;

            // store data to local device
            await AsyncStorage.setItem('userDataLocal', JSON.stringify(userDataLocal));

            dispatch({ type: USER_DATA_INCOME, payload: userData });
            
        } catch (e) {
            console.log(e);
            AsyncStorage.setItem('loggedInStatus', JSON.stringify(false));
            dispatch({ type: EXPENSES_SYNCHRONISED, payload: false });
        }
    };
};

const addTransactions = (loginToken, transaction) => {
    return axios.post(`${config.server.API}/transactions`, transaction, {
        headers: {
          Authorization: loginToken
        }
      }).then((result) => {
        return result;
    }).catch((error) => {
        throw error;
    });       
};


const getUserDataFromServer = async (login, loginToken, date) => {

    try {
        // set begin and end date of current month
        date = new Date(date);
        let dateBegin = new Date(date.getFullYear(), date.getMonth(), 1);
        let dateEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        dateBegin = Moment(dateBegin).format('YYYY-MM-DD');
        dateEnd = Moment(dateEnd).format('YYYY-MM-DD');

        const categories = await getCategories(loginToken, login);

        const transactions = await getTransactions(loginToken, login, dateBegin, dateEnd);

        return { categories, transactions };
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCategories = (loginToken, login) => {
    return axios.get(`${config.server.API}/categories?userId=${login}&type=expense`,{
        headers: {
          Authorization: loginToken
        }
      }).then((categories) => { 
        return categories.data;
    }).catch((error) => {
        throw error;
    });       
};

const getTransactions = (loginToken, login, dateBegin, dateEnd) => {
    return axios.get(`${config.server.API}/transactions?userId=${login}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&type=expense`,{
        headers: {
          Authorization: loginToken
        }
      }).then((transactions) => {
        
        return transactions.data;
    }).catch((error) => {
        throw error;
    });       
};

const userDataFormat = (categories, transactions, date) => {

    const data = [];
    // calculate total for each category 
    const transactionTotals = {};
    for (let i = 0; i < transactions.length; i++) {
        let total = 0;
        if (transactionTotals[transactions[i].categoryId]) {
            total = transactionTotals[transactions[i].categoryId];
        }
        
        const expenseAmount = transactions[i].expenseAmount ? transactions[i].expenseAmount : 0;
        
        transactionTotals[transactions[i].categoryId] = total + expenseAmount;
    }

    const dateMonth = Moment().format('YYYY-MM-DD');

    data.push({ category: 'Total', budget: 0, remaining: 0, total: 0, date: dateMonth });

    let totalBudget = 0;
    let totalRemaining = 0;
    let totalAmount = 0;
    for (let i = 0; i < categories.length; i++) {
        // add total and remaining
        const total = transactionTotals[categories[i].categoryId] ? transactionTotals[categories[i].categoryId] : 0;
        const remaining = categories[i].budget - total;
        totalAmount += total;
        totalBudget += categories[i].budget;
        data.push({ ...categories[i], remaining, total, date: dateMonth });
    }

    totalRemaining += totalBudget - totalAmount;
    data[0].budget = totalBudget;
    data[0].remaining = totalRemaining;
    data[0].total = totalAmount;

    const userData = {
        data,
        settings: {
            currency: 'R'
        },
        categories
    };

    return userData;

};
