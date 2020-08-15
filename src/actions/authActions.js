import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
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
                dispatch({ type: LOGIN_USER_SUCCESS, payload: 'user' });
                Actions.main();
            },
            onFailure(err) {
                console.log('error');
                console.log(err);
                dispatch({ type: LOGIN_USER_FAIL });
            }
        });

        
    };

};

