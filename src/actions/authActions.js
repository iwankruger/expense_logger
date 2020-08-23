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

                AsyncStorage.setItem('loginToken', result.idToken.jwtToken).then(() => {
                    console.log('SAVED IP IN SESSION ');
                    dispatch({ type: LOGIN_USER_SUCCESS, payload: 'user' });
                    Actions.main();
                }).catch(() => {
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
       
        const loginToken = await AsyncStorage.getItem('loginToken');
        console.log('login token ', loginToken);

        const categories = await getCategories(loginToken);
        console.log('categories ', categories);

        const transactions = await getTransactions(loginToken);
        console.log('transactions ', transactions);
        
        const userData = getUserData(categories, transactions);

        if (loginToken) Actions.main();

        dispatch({ type: USER_DATA, payload: userData });
    };
};

const getCategories = (loginToken) => {
    return axios.get(`https://mbvhmpnj3c.execute-api.us-east-1.amazonaws.com/dev/categories`,{
        headers: {
          'Authorization': loginToken
        }
      }).then((categories) => { 
        return categories.data;
    }).catch((error) => {
        throw error;
    });       
};

const getTransactions = (loginToken) => {
    return axios.get(`https://mbvhmpnj3c.execute-api.us-east-1.amazonaws.com/dev/transactions`,{
        headers: {
          'Authorization': loginToken
        }
      }).then((stations) => {
        console.log('GET  stations result ', stations);
        
        return stations.data;
    }).catch((error) => {
        throw error;
    });       
};

// todo get user data from dynamodb
const getUserData = (categories, transactions) => {

    const data = [];
    console.log('CAT ',categories.length);
    console.log('CAT ',categories);

    for (let i = 0; i < categories.length; i++) {
        const remaining = 100;
        const total = 700;
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



