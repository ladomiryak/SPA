import {
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAILURE,
    PENDING_USER_VERIFICATION,
    UNAUTHORIZED,
    AUTHORIZED,
    LOGOUT,
    LOGIN_SUCCESS,
} from '../constants/authorization';
import {
    ACTIVATE_PROFILE_SUCCESS,
} from '../constants/profile';

const defaultState = {
    user: {},
    status: PENDING_USER_VERIFICATION,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS :
        case ACTIVATE_PROFILE_SUCCESS :
        case AUTHORIZATION_SUCCESS :
            return {
                user: payload.user,
                status: AUTHORIZED,
            };

        case AUTHORIZATION_FAILURE :
        case LOGOUT :
            return {
                user: {},
                status: UNAUTHORIZED,
            };

        default :
            return state;
    }
};
