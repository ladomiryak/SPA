import {
    INITIALIZE,
    IS_AUTHORIZED,
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAILURE,
    LOGOUT,
    LOGIN,
    LOGIN_SUCCESS,
    FORGOT_PASSWORD,
} from './../constants/authorization';

export const initialization = () => {
    return {
        type: INITIALIZE,
        payload: {},
    };
};

export const isAuth = () => {
    return {
        type: IS_AUTHORIZED,
        payload: {},
    };
};

export const authorizationSuccess = (profile) => {
    return {
        type: AUTHORIZATION_SUCCESS,
        payload: {
            user: profile,
        },
    };
};

export const authorizationFailure = () => {
    return {
        type: AUTHORIZATION_FAILURE,
        payload: {},
    };
};

export const forgotPassword = () => {
    return {
        type: FORGOT_PASSWORD,
        payload: {},
    };
};

export const login = () => {
    return {
        type: LOGIN,
        payload: {},
    };
};

export const loginSuccess = (profile) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user: profile,
        },
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: {},
    };
};
