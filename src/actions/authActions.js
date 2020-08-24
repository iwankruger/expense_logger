import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    USER_DATA
} from './types';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession
  } from 'amazon-cognito-identity-js';
import * as authConfig from '../../authConfig';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';

const POOL_DATA = {
    UserPoolId: authConfig.cognitoConfig.userPoolId, 
    ClientId: authConfig.cognitoConfig.clientId, 
};

const userPool = new CognitoUserPool(POOL_DATA);

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    console.log({ email, password });

    const authData = {
        Username: email,
        Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    const that = this;

    
    return (dispatch) => {
        console.log('start login');

        dispatch({ type: LOGIN_USER });

        cognitoUser.authenticateUser(authDetails, {
            onSuccess(result) {
                // that.authStatusChanged.next(true);
                // that.authDidFail.next(false);
                // that.authIsLoading.next(false);
                console.log('success');
                console.log(result);
                console.log(result.idToken.jwtToken);

                const loginData = {
                    login: email, 
                    loginToken: result.idToken.jwtToken
                };
                console.log(loginData);

                AsyncStorage.setItem('loginData', JSON.stringify(loginData)).then(() => {
                    console.log('SAVED IP IN SESSION ');
                    dispatch({ type: LOGIN_USER_SUCCESS, payload: 'user' });
                    Actions.main();
                }).catch((e) => {
                    console.log('EEE ',e);
                    dispatch({ type: LOGIN_USER_FAIL });   
                });     

            },
            onFailure(err) {
                console.log('error');
                console.log(err);
                dispatch({ type: LOGIN_USER_FAIL });
            }
        });

        
    };

};

export const checkIfUserIsLoggedIn = () => {

    return async (dispatch) => {
       
        let loginData = await AsyncStorage.getItem('loginData');
        loginData = JSON.parse(loginData);

        const loginToken = loginData.loginToken;
        const login = loginData.login;
       
        // set begin and end date of current month
        const date = new Date();
        let dateBegin = new Date(date.getFullYear(), date.getMonth(), 1);
        let dateEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        dateBegin = Moment(dateBegin).format('YYYY-MM-DD');
        dateEnd = Moment(dateEnd).format('YYYY-MM-DD');

        const categories = await getCategories(loginToken);
        console.log('categories ', categories);

        const transactions = await getTransactions(loginToken, login, dateBegin, dateEnd);
        console.log('transactions ', transactions);
        
        const userData = getUserData(categories, transactions);

        if (loginToken) Actions.main();

        dispatch({ type: USER_DATA, payload: userData });
    };
};

const getCategories = (loginToken) => {
    return axios.get(`https://mbvhmpnj3c.execute-api.us-east-1.amazonaws.com/dev/categories`,{
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
    console.log(`https://mbvhmpnj3c.execute-api.us-east-1.amazonaws.com/dev/transactions?userId=${login}&dateBegin=${dateBegin}&dateEnd=${dateEnd}`);
    return axios.get(`https://mbvhmpnj3c.execute-api.us-east-1.amazonaws.com/dev/transactions?userId=${login}&dateBegin=${dateBegin}&dateEnd=${dateEnd}`,{
        headers: {
          Authorization: loginToken
        }
      }).then((stations) => {
        console.log('GET  transactions result ', stations);
        
        return stations.data;
    }).catch((error) => {
        throw error;
    });       
};

// todo get user data from dynamodb
const getUserData = (categories, transactions) => {

    const data = [];
    console.log('CAT ', categories.length);
    console.log('CAT ', categories);

    const transactionTotals = {};
    for (let i = 0; i < transactions.length; i++) {
        let total = 0;
        if (transactionTotals[transactions[i].categoryId]) {
            total = transactionTotals[transactions[i].categoryId];
        }
        transactionTotals[transactions[i].categoryId] = total + transactions[i].value;
    }

    for (let i = 0; i < categories.length; i++) {
        const total = transactionTotals[categories[i].categoryId] ? transactionTotals[categories[i].categoryId] : 0;
        const remaining = categories[i].budget - total;
        data.push({ ...categories[i], remaining, total });
    }
    console.log(data);
    const userData = {
        data,
        // [
        //     {
        //         categoryId: 1,
        //         category: 'Food',
        //         total: 120.00,
        //         budget: 500.00,
        //         remaining: 380.00
        //     }
        // ],
        settings: {
            currency: 'R'
        },
        categories
    };

    return userData;

};



