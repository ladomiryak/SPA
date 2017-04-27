import axios from 'axios';
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';
import {
    PROFILE_CHANGE_PASSWORD,
    ACTIVATE_PROFILE,
} from './../constants/profile';
import {
    API_URL,
    API_PROFILE_CHANGE_PASSWORD_URL,
    API_PROFILE_ACTIVATION,
} from '../constants/api';
import {
    ROUTE_PROFILE,
    ROUTE_DASHBOARD,
} from '../constants/routes';
import {
    activateProfileSuccess as activateProfileSuccessAction,
} from '../actions/profile';

const apiChangePassword = ({ oldPassword, newPassword, confirmNewPassword }) => {
    return axios.post(`${API_URL}${API_PROFILE_CHANGE_PASSWORD_URL}`, {
        oldPassword,
        newPassword,
        confirmNewPassword,
    }).then(response => response.data);
};

const apiActivate = ({ newPassword, confirmNewPassword }) => {
    return axios.post(`${API_URL}${API_PROFILE_ACTIVATION}`, {
        newPassword,
        confirmNewPassword,
    }).then(response => response.data);
};

export default function () {
    return [
        takeLatest(PROFILE_CHANGE_PASSWORD, function * () {
            try {
                const {
                    oldPassword,
                    newPassword,
                    confirmNewPassword,
                } = yield select(
                    state => state.form.changeProfilePassword.values
                );

                yield call(apiChangePassword, {
                    oldPassword,
                    newPassword,
                    confirmNewPassword,
                });

                yield put(push(ROUTE_PROFILE));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(ACTIVATE_PROFILE, function * () {
            try {
                const {
                    newPassword,
                    confirmNewPassword,
                } = yield select(
                    state => state.form.activation.values
                );

                const response = yield call(apiActivate, {
                    newPassword,
                    confirmNewPassword,
                });
                const profile = response.data;

                yield put(activateProfileSuccessAction(profile));
                yield put(push(ROUTE_DASHBOARD));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
    ];
}
