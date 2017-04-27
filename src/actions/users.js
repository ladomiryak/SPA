import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    SHOW_EDIT_USER_COMPONENT,
    EDIT_USER,
    USER_EDITED,
    CANCEL_EDIT_USER,
    SHOW_USER_PROFILE,
    SHOW_USER_PROFILE_SUCCESS
} from '../constants/users';

export const fetchUsers = (payload) => {
    return {
        type: FETCH_USERS,
        payload,
    };
};

export const fetchUserSuccess = (payload) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload,
    };
};



export const showEditUserComponent = (user) => {
    return {
        type: SHOW_EDIT_USER_COMPONENT,
        payload: {
            user,
        },
    };
};

export const cancelEditUser = () => {
    return {
        type: CANCEL_EDIT_USER,
        payload: {},
    };
};

export const editUser = (userId) => {
    return {
        type: EDIT_USER,
        payload: {
            userId,
        },
    };
};

export const userEdited = (user) => {
    return {
        type: USER_EDITED,
        payload: {
            user,
        },
    };
};

export const ShowUserProfile = (id) => {
    return {
        type: SHOW_USER_PROFILE,
        payload : id
    };
};

export const ShowUserProfileSuccess = (payload) => {
    return {
        type: SHOW_USER_PROFILE_SUCCESS,
        payload,
    };
};


