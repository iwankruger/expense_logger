import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    CATEGORY_UPDATE,
    EXPENSE_ADD_DESCRIPTION_UPDATE,
    EXPENSE_ADD_AMOUNT_UPDATE,
    EXPENSE_ADD_SAVE,
    EXPENSES_SYNCHRONISED,
    USER_DATA,
    DATE_CHANGED
} from './types';
import Moment from 'moment';
import * as config from '../../config';
import axios from 'axios';


export const synchroniseStatus = () => {

    return async (dispatch) => {
        try {
            let transactionUpload = await AsyncStorage.getItem('transactionUpload');
            
            // if no transactions exist, exit
            if (!transactionUpload) return dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });
   
            // decode transactions into an object
            transactionUpload = JSON.parse(transactionUpload);
            
            if (transactionUpload.length === 0) return dispatch({ type: EXPENSES_SYNCHRONISED, payload: true });

            return dispatch({ type: EXPENSES_SYNCHRONISED, payload: false });
         
        } catch (e) {
            console.log(e);
        }
    }
}

export const synchronise = (date) => {

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

            const userDataMonthExpense = await getUserDataFromServer(login, loginToken, date, 'expense');
            const userDataExpense = userDataFormat(userDataMonthExpense.categories, userDataMonthExpense.transactions);
            const userDataMonthIncome = await getUserDataFromServer(login, loginToken, date, 'income');
            const userDataIncome = userDataFormatIncome(userDataMonthIncome.categories, userDataMonthIncome.transactions);

            // get user data in storage
            let userDataLocal = await AsyncStorage.getItem('userDataLocal');

            if (userDataLocal) {
                userDataLocal = JSON.parse(userDataLocal);
            } else {
                userDataLocal = {};
            }

            userDataLocal.categoriesExpense = userDataExpense.categories;
            userDataLocal.categoriesIncome = userDataIncome.categories;
            userDataLocal.settings = userDataExpense.settings;
            userDataLocal[date] = { 
                expenseOverview: userDataExpense.data, 
                expenses: userDataMonthExpense.transactions,
                incomeOverview: userDataIncome.data,
                incomes: userDataMonthIncome.transactions
            };

            // store data to local device
            await AsyncStorage.setItem('userDataLocal', JSON.stringify(userDataLocal));

            const userData = {
                categoriesExpense: userDataExpense.categories,
                categoriesIncome: userDataIncome.categories,
                settings: userDataExpense.settings,
                expenseOverview: userDataExpense.data,
                incomeOverview: userDataIncome.data,
                expenses: userDataMonthExpense.transactions,
                incomes: userDataMonthIncome.transactions
            };

            dispatch({ type: USER_DATA, payload: userData });
            
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


const getUserDataFromServer = async (login, loginToken, date, type) => {

    try {
        // set begin and end date of current month
        date = new Date(date);
        let dateBegin = new Date(date.getFullYear(), date.getMonth(), 1);
        let dateEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        dateBegin = Moment(dateBegin).format('YYYY-MM-DD');
        dateEnd = Moment(dateEnd).format('YYYY-MM-DD');

        const categories = await getCategories(loginToken, login, type);

        const transactions = await getTransactions(loginToken, login, dateBegin, dateEnd, type);

        return { categories, transactions };
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCategories = (loginToken, login, type) => {
    const loginUrlEncoded = encodeURIComponent(`${login}`);
    return axios.get(`${config.server.API}/categories?userId=${loginUrlEncoded}&type=${type}`,{
        headers: {
          Authorization: loginToken
        }
      }).then((categories) => { 
        return categories.data;
    }).catch((error) => {
        throw error;
    });       
};

const getTransactions = (loginToken, login, dateBegin, dateEnd, type) => {
    const loginUrlEncoded = encodeURIComponent(`${login}`);
    return axios.get(`${config.server.API}/transactions?userId=${loginUrlEncoded}&dateBegin=${dateBegin}&dateEnd=${dateEnd} 24:0:0&type=${type}`,{
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

const userDataFormatIncome = (categories, transactions, date) => {

    const data = [];
    data.push({ category: 'Total', incomeGrossAmount: 0, incomeTaxAmount: 0, incomeAfterTaxAmount: 0, date: dateMonth });
    
    for (let i = 0; i < transactions.length; i++) {
        const incomeGrossAmount = transactions[i].incomeGrossAmount ? transactions[i].incomeGrossAmount : 0;
        const taxAmount = transactions[i].taxAmount ? transactions[i].taxAmount : 0;
        const uifAmount = transactions[i].uifAmount ? transactions[i].uifAmount : 0;
        const otherTaxAmount = transactions[i].otherTaxAmount ? transactions[i].otherTaxAmount : 0;
        const incomeTaxAmount = taxAmount + uifAmount + otherTaxAmount;
        const incomeAfterTaxAmount = incomeGrossAmount - incomeTaxAmount;
        data.push({ ...transactions[i], incomeTaxAmount, incomeAfterTaxAmount });
        data[0].incomeGrossAmount += incomeGrossAmount;
        data[0].incomeTaxAmount += incomeTaxAmount;
        data[0].incomeAfterTaxAmount += incomeAfterTaxAmount;
    }

    const dateMonth = Moment().format('YYYY-MM-DD');

    const userData = {
        data,
        settings: {
            currency: 'R'
        },
        categories
    };

    return userData;

};



export const setMonth = (date) => {
    date = Moment(date, 'MM-YYYY').format('YYYY-MM-01');
  
    return async (dispatch) => {

        try {
            // get user data from local device
            let userDataLocal = await AsyncStorage.getItem('userDataLocal');
            
            if (userDataLocal) {
                userDataLocal = JSON.parse(userDataLocal);

                let userData = { categories: [], settings: null, data: [] };
                if (userDataLocal && userDataLocal.categoriesExpense && userDataLocal.categoriesIncome
                    && userDataLocal.settings && userDataLocal[date]
                    && userDataLocal[date].expenseOverview
                    && userDataLocal[date].incomeOverview
                    && userDataLocal[date].expenses
                    && userDataLocal[date].incomes
                    ) {
                    userData = {
                        categoriesExpense: userDataLocal.categoriesExpense,
                        categoriesIncome: userDataLocal.categoriesIncome,
                        settings: userDataLocal.settings,
                        expenseOverview: userDataLocal[date].expenseOverview,
                        incomeOverview: userDataLocal[date].incomeOverview,
                        expenses: userDataLocal[date].expenses,
                        incomes: userDataLocal[date].incomes
                    };
                }

                dispatch({ type: USER_DATA, payload: userData });
            }

            dispatch({ type: DATE_CHANGED, payload: date });
        
        } catch (e) {
            console.log(e);
        }
    };
};
