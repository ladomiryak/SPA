import lodash from 'lodash';
import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    SHOW_CREATE_USER_COMPONENT,
    CLOSE_CREATE_USER_COMPONENT,
    USER_CREATED,
    SHOW_EDIT_USER_COMPONENT,
    CANCEL_EDIT_USER,
    USER_EDITED,
    PREPARE_USER_TO_CHANGE_STATUS,
    USER_STATUS_CHANGED,
    STORE_SUBORDINATES,
    NEW_SUPERVISOR_SAVED,
    SHOW_USER_PROFILE,
    SHOW_USER_PROFILE_SUCCESS
} from '../constants/users';
import {
    LOGOUT,
} from '../constants/authorization';
import {
    USER_STATUS_ACTIVE,
    USER_STATUS_DISABLED,
} from '../constants/profile';

const defaultState = {
    users: [],
    totalPages: null,
    totalRecords: 0,
    showCreateUserComponent: false,
    query: {
        page: 1,
        count: 20,
    },
    editableUser: null,
    editableUserSubordinates: [],
    preparedToChangeStatus: null,
    current : ''
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    let users;
    let index;

    switch (type) {
        case FETCH_USERS :
            return {
                ...state,
                query: {
                    ...state.query,
                    ...payload,
                },
            };

        case FETCH_USERS_SUCCESS :
            return {
                ...state,
                users: payload.items,
                totalRecords: payload.total,
                totalPages: Math.ceil(payload.total / state.query.count),
            };

        case SHOW_CREATE_USER_COMPONENT :
            return {
                ...state,
                showCreateUserComponent: true,
            };

        case CLOSE_CREATE_USER_COMPONENT :
            return {
                ...state,
                showCreateUserComponent: false,
            };

        case USER_CREATED :
            return {
                ...state,
                users: [
                    payload.user,
                    ...state.users,
                ],
                totalRecords: ++state.totalRecords,
                showCreateUserComponent: false,
            };

        case SHOW_EDIT_USER_COMPONENT :
            return {
                ...state,
                editableUser: payload.user,
            };

        case USER_EDITED :
            index = lodash.findIndex(
                state.users,
                user => user._id === payload.user._id
            );
            users = [...state.users];
            users[index] = payload.user;

            return {
                ...state,
                users,
                editableUser: null,
            };

        case CANCEL_EDIT_USER :
            return {
                ...state,
                editableUser: null,
            };

        case PREPARE_USER_TO_CHANGE_STATUS :
            return {
                ...state,
                preparedToChangeStatus: payload,
            };

        case USER_STATUS_CHANGED :
            index = lodash.findIndex(
                state.users,
                user => user._id === payload.userId
            );
            users = [...state.users];
            const user = users[index];

            user.status = (user.status === USER_STATUS_ACTIVE)
                ? USER_STATUS_DISABLED
                : USER_STATUS_ACTIVE;

            users[index] = user;

            return {
                ...state,
                users,
                preparedToChangeStatus: null,
                editableUser: null,
            };

        case STORE_SUBORDINATES :
            return {
                ...state,
                editableUserSubordinates: payload.items,
            };

        case NEW_SUPERVISOR_SAVED :
            return {
                ...state,
                editableUserSubordinates: [],
                editableUser: null,
            };

        case SHOW_USER_PROFILE :

            return {
                ...state,
                current : payload
            };

        case SHOW_USER_PROFILE_SUCCESS :

            return {
                ...state,
                current : payload
            };


        case LOGOUT :
            return defaultState;

        default :
            return state;
    }
};
