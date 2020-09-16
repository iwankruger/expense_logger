import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    USER_DATA,
    SET_LOGIN
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

        dispatch({ type: LOGIN_USER });

        cognitoUser.authenticateUser(authDetails, {
            onSuccess(result) {
                // that.authStatusChanged.next(true);
                // that.authDidFail.next(false);
                // that.authIsLoading.next(false);
                console.log('JWT token');
                console.log(result.idToken.jwtToken);

                const loginData = {
                    login: email, 
                    loginToken: result.idToken.jwtToken
                };

                AsyncStorage.setItem('loginData', JSON.stringify(loginData)).then(() => {
                    return AsyncStorage.setItem('loggedInStatus', JSON.stringify(true));
                }).then(() => {
                    dispatch({ type: LOGIN_USER_SUCCESS, payload: 'user' });
                    Actions.main();
                }).catch((e) => {
                    AsyncStorage.setItem('loggedInStatus', JSON.stringify(false));
                    dispatch({ type: LOGIN_USER_FAIL });
                });
                     

            },
            onFailure(err) {
                AsyncStorage.setItem('loggedInStatus', JSON.stringify(false));
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

            const loginToken = loginData.loginToken;
            const login = loginData.login;
            dispatch({ type: SET_LOGIN, payload: login });

            let loggedInStatus = await AsyncStorage.getItem('loggedInStatus');
            loggedInStatus = JSON.parse(loggedInStatus);
           
            if (!loginToken || !loggedInStatus) return;

            // get user data from local device
            let userDataLocal = await AsyncStorage.getItem('userDataLocal');

            if (userDataLocal) {
                userDataLocal = JSON.parse(userDataLocal);
                const dateCurrent = Moment().format('YYYY-MM-01');

                let userData = { categories: [], settings: null, data: [] };
                if (userDataLocal && userDataLocal.categoriesExpense && userDataLocal.categoriesIncome
                    && userDataLocal.settings && userDataLocal[dateCurrent]
                    && userDataLocal[dateCurrent].expenseOverview
                    && userDataLocal[dateCurrent].incomeOverview
                    && userDataLocal[dateCurrent].expenses
                    && userDataLocal[dateCurrent].incomes
                    ) {
                    userData = {
                        categoriesExpense: userDataLocal.categoriesExpense,
                        categoriesIncome: userDataLocal.categoriesIncome,
                        settings: userDataLocal.settings,
                        expenseOverview: userDataLocal[dateCurrent].expenseOverview,
                        incomeOverview: userDataLocal[dateCurrent].incomeOverview,
                        expenses: userDataLocal[dateCurrent].expenses,
                        incomes: userDataLocal[dateCurrent].incomes
                    };
                }

                dispatch({ type: USER_DATA, payload: userData });
            }
            Actions.main();
        } catch (e) {

        }

    };
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

