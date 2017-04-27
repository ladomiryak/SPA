import {
    PROFILE_CHANGE_PASSWORD,
    ACTIVATE_PROFILE,
    ACTIVATE_PROFILE_SUCCESS,
} from '../constants/profile';

export const changePassword = () => {
    return {
        type: PROFILE_CHANGE_PASSWORD,
        payload: {},
    };
};

export const activateProfile = () => {
    return {
        type: ACTIVATE_PROFILE,
        payload: {},
    };
};

export const activateProfileSuccess = (profile) => {
    return {
        type: ACTIVATE_PROFILE_SUCCESS,
        payload: {
            user: profile,
        },
    };
};
