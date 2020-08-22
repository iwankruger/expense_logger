import { AsyncStorage } from 'react-native';
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
        
        const userData = getUserData();

        if (loginToken) Actions.main();

        dispatch({ type: USER_DATA, payload: userData });
    };
};

// todo get user data from dynamodb
const getUserData = () => {

    const userData = {
        data: [
            {
                categoryId: 1,
                category: 'Food',
                total: 120.00,
                budget: 500.00,
                remaining: 380.00
            },
            {
                categoryId: 2,
                category: 'Petrol',
                total: 655.00,
                budget: 700.00,
                remaining: 300.00
            },
            {
                categoryId: 3,
                category: 'Electricity',
                total: 320.00,
                budget: 500.00,
                remaining: 180.00
            }
        ],
        settings: {
            currency: 'R'
        },
        categories: [
            {
                categoryId: 1,
                category: 'Food'
            },
            {
                categoryId: 2,
                category: 'Petrol'
            },
            {
                categoryId: 3,
                category: 'Electricity'
            }
        ]
    };

    return userData;

};



