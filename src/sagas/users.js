import axios from 'axios';
import {takeLatest} from 'redux-saga';
import {push} from 'react-router-redux';
import {select, call, put} from 'redux-saga/effects';
import {
    FETCH_USERS,
    CREATE_USER,
    EDIT_USER,
    CONFIRM_CHANGE_STATUS_OF_USER,
    PREPARE_STATE_FOR_MANAGING_SUBORDINATES,
    SUBMIT_NEW_SUPERVISOR,
    SHOW_USER_PROFILE
} from './../constants/users';
import {
    API_URL,
    API_FETCH_USERS_URL,
    API_CREATE_USERS_URL,
    API_EDIT_USERS_URL,
    API_CHANGE_USER_STATUS_URL,
    API_FETCH_SUBORDINATES_URL,
    API_SAVE_NEW_SUPERVISOR_URL,
    API_SHOW_USER_PROFILE_URL
} from '../constants/api';
import {
    fetchUserSuccess as fetchUserSuccessAction,
    userCreated as userCreatedAction,
    userEdited as userEditedAction,
    userStatusChanged as userStatusChangedAction,
    storeSubordinates as storeSubordinatesAction,
    ShowUserProfileSuccess as ShowUserProfileSuccessAction,
} from '../actions/users';
import {
    fetchAvailableSupervisors as fetchAvailableSupervisorsAction,
} from '../actions/additional';
import {
    ROUTE_TO_USERS_LIST,
} from '../constants/routes';

const apiFetchUsers = (payload) => {
    return axios.get(`${API_URL}${API_FETCH_USERS_URL}`, {
        params: payload,
    }).then(response => response.data);
};

const apiCreateUser = (payload) => {
    return axios.post(`${API_URL}${API_CREATE_USERS_URL}`, {
        ...payload,
    }).then(response => response.data);
};

const apiEditUser = (payload, userId) => {
    return axios.put(`${API_URL}${API_EDIT_USERS_URL}/${userId}`, {
        ...payload,
    }).then(response => response.data);
};

const apiChangeStatusOfUser = (payload) => {
    return axios.put(`${API_URL}${API_CHANGE_USER_STATUS_URL}/${payload.userId}`, {
        action: payload.action,
    }).then(response => response.data);
};

const apiFetchSubordinates = (supervisor) => {
    return axios.get(`${API_URL}${API_FETCH_SUBORDINATES_URL}?supervisor=${supervisor}`)
        .then(response => response.data);
};

const apiSaveNewSupervisor = ({oldSupervisor, newSupervisor}) => {
    return axios.put(`${API_URL}${API_SAVE_NEW_SUPERVISOR_URL}`, {
        oldSupervisor,
        newSupervisor,
    }).then(response => response.data);
};

const apiProfileUsers = (id) => {
    return axios.get(`${API_URL}${API_SHOW_USER_PROFILE_URL}/${id}`, {
    }).then(response => response.data);
};

export default function () {
    return [
        takeLatest(FETCH_USERS, function *() {
            const payload = yield select(
                state => state.users.query
            );

            try {
                const response = yield call(apiFetchUsers, payload);

                yield put(fetchUserSuccessAction(response.data));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(CREATE_USER, function *() {
            const payload = yield select(
                state => state.form.createUser.values
            );

            try {
                const response = yield call(apiCreateUser, payload);

                yield put(userCreatedAction(response.data));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(EDIT_USER, function *(action) {
            const {payload} = action;
            const data = yield select(
                state => state.form.editUser.values
            );

            try {
                const response = yield call(apiEditUser, data, payload.userId);

                yield put(userEditedAction(response.data));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(CONFIRM_CHANGE_STATUS_OF_USER, function *() {
            const payload = yield select(
                state => state.users.preparedToChangeStatus
            );

            try {
                yield call(apiChangeStatusOfUser, payload);

                yield put(userStatusChangedAction({
                    userId: payload.userId,
                }));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(PREPARE_STATE_FOR_MANAGING_SUBORDINATES, function *(action) {
            const {payload} = action;

            try {
                const response = yield call(apiFetchSubordinates, payload.userId);
                yield put(fetchAvailableSupervisorsAction({
                    page: 1,
                    search: '',
                }));

                yield put(storeSubordinatesAction(response.data));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(SUBMIT_NEW_SUPERVISOR, function *() {
            const payload = yield select(
                state => state.form.manageSubordinates.values
            );

            try {
                yield call(apiSaveNewSupervisor, payload);

                yield put();
                yield put(push(ROUTE_TO_USERS_LIST));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(SHOW_USER_PROFILE, function *() {
            const payload = yield select(
                state => state.users.current
            );


            try {
                const response = yield call(apiProfileUsers, payload);

                yield put(ShowUserProfileSuccessAction(response.data));

            } catch (ex) {
                // todo dispatch type error
            }
        }),
    ];
}
