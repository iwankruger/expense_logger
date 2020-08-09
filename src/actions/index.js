import { EMAIL_CHANGED, PASSWORD_CHANGED } from './types';

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
    return (dispatch) => {
        console.log('start login');

        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: 'user' });
    };

};

