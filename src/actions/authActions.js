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
import * as config from '../../config';

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
                    return AsyncStorage.setItem('loggedInStatus', JSON.stringify(true));
                }).then(() => {
                    console.log('SAVED IP IN SESSION ');
                    dispatch({ type: LOGIN_USER_SUCCESS, payload: 'user' });
                    Actions.main();
                }).catch((e) => {
                    AsyncStorage.setItem('loggedInStatus', JSON.stringify(false));
                    console.log('EEE ', e);
                    dispatch({ type: LOGIN_USER_FAIL });
                });
                     

            },
            onFailure(err) {
                AsyncStorage.setItem('loggedInStatus', JSON.stringify(false));
                console.log('error');
                console.log(err);
                dispatch({ type: LOGIN_USER_FAIL });
            }
        });

        
    };

};


export const checkIfUserIsLoggedIn = () => {

    return async (dispatch) => {

        try {
            let loginData = await AsyncStorage.getItem('loginData');
            loginData = JSON.parse(loginData);

            console.log('login Data ', loginData);

            const loginToken = loginData.loginToken;
            const login = loginData.login;

            let loggedInStatus = await AsyncStorage.getItem('loggedInStatus');
            loggedInStatus = JSON.parse(loggedInStatus);
           
            if (!loginToken || !loggedInStatus) return;

            // get user data from local device
            let userDataLocal = await AsyncStorage.getItem('userDataLocal');
            console.log('LOCAL ', userDataLocal);

            if (userDataLocal) {
                userDataLocal = JSON.parse(userDataLocal);
                console.log('PARSE LOCAL ', userDataLocal);
                const dateCurrent = Moment().format('YYYY-MM-01');

                let userData = { categories: [], settings: null, data: [] };
                if (userDataLocal && userDataLocal.settings && userDataLocal.categories && userDataLocal[dateCurrent]) {
                    userData = { categories: userDataLocal.categories, settings: userDataLocal.settings, data: userDataLocal[dateCurrent] };
                }

                dispatch({ type: USER_DATA, payload: userData });
            }
            Actions.main();
        } catch (e) {

        }

    };
};


export const checkIfUserIsLoggedI2 = () => {

    return async (dispatch) => {
       
        let loginData = await AsyncStorage.getItem('loginData');
        loginData = JSON.parse(loginData);

        console.log('login Data ', loginData);

        const loginToken = loginData.loginToken;
        const login = loginData.login;
       
        let userData = await getUserDataFromServer(login, loginToken);

        userData = userDataFormat(userData.categories, userData.transactions);

        if (loginToken) Actions.main();

        dispatch({ type: USER_DATA, payload: userData });
    };
};


const getUserDataFromServer = async (login, loginToken) => {

    try {
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

        return { categories, transactions };
    } catch (error) {
        return Promise.reject(error);
    }
}



const getCategories = (loginToken) => {
    console.log(config.server.API);
    return axios.get(`${config.server.API}/categories`,{
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
    return axios.get(`${config.server.API}/transactions?userId=${login}&dateBegin=${dateBegin}&dateEnd=${dateEnd}`,{
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
const userDataFormat = (categories, transactions) => {

    const data = [];
    console.log('CAT ', categories);
    console.log('CAT ', transactions);

    // calculate total for each category 
    const transactionTotals = {};
    for (let i = 0; i < transactions.length; i++) {
        let total = 0;
        if (transactionTotals[transactions[i].categoryId]) {
            total = transactionTotals[transactions[i].categoryId];
        }
        transactionTotals[transactions[i].categoryId] = total + transactions[i].value;
    }

    const dateMonth = Moment().format('YYYY-MM-DD');

    for (let i = 0; i < categories.length; i++) {
        // add total and remaining
        const total = transactionTotals[categories[i].categoryId] ? transactionTotals[categories[i].categoryId] : 0;
        const remaining = categories[i].budget - total;
        data.push({ ...categories[i], remaining, total, date: dateMonth });
    }

    const userData = {
        data,
        settings: {
            currency: 'R'
        },
        categories
    };

    return userData;

};

export const synchroniseWithServer = () => {
    console.log('sync with server');
}

export const logout = () => {

    return async (dispatch) => {

        try {

            await AsyncStorage.setItem('loginData', '');
            await AsyncStorage.setItem('loggedInStatus', '');
    
            Actions.auth();
        } catch (e) {
            console.log(e);
        }
    }
}

export const clearLocalData = () => {

    return async (dispatch) => {

        try {

            await AsyncStorage.setItem('userDataLocal', '');

            Actions.auth();
        } catch (e) {
            console.log(e);
        }
    }
}

