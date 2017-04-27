import axios from 'axios';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { select, call, put } from 'redux-saga/effects';
import {
    ROUTE_LOGIN,
    ROUTE_DASHBOARD,
    ROUTE_STORY_INFO,
    ROUTE_ACTIVATION,
    ROUTE_FORGOT_PASSWORD,
} from '../constants/routes';
import {
    API_URL,
    API_IS_AUTHORIZED_URL,
    API_LOGOUT_URL,
    API_LOGIN_URL,
    API_FORGOT_PASSWORD_URL,
} from './../constants/api';
import {
    INITIALIZE,
    IS_AUTHORIZED,
    LOGOUT,
    LOGIN,
    FORGOT_PASSWORD,
} from './../constants/authorization';
import {
    isAuth as isAuthAction,
    authorizationSuccess as authorizationSuccessAction,
    authorizationFailure as authorizationFailureAction,
    loginSuccess as loginSuccessAction,
} from '../actions/authorization';
import {
    getListOfAccessRoles as getListOfAccessRolesAction,
} from '../actions/additional';
import {
    USER_STATUS_INVITED,
} from '../constants/profile';

const apiIsAuthorized = () => {
    return axios.get(`${API_URL}${API_IS_AUTHORIZED_URL}`)
        .then(response => response.data);
};

const apiForgotPassword = ({ email }) => {
    return axios.post(`${API_URL}${API_FORGOT_PASSWORD_URL}`, {
        email,
    }).then((response) => (response.data));
};

const apiLogin = ({ email, password }) => {
    return axios.post(`${API_URL}${API_LOGIN_URL}`, {
        email,
        password,
    }).then(response => response.data);
};

const apiLogOut = () => {
    return axios.get(`${API_URL}${API_LOGOUT_URL}`)
        .then(response => response.data);
};

export default function () {
    return [
        takeLatest(INITIALIZE, function * () {
            yield put(isAuthAction());
        }),
        takeLatest(IS_AUTHORIZED, function * () {
            try {
                const response = yield call(apiIsAuthorized);
                const profile = response.data;

                yield put(authorizationSuccessAction(profile));

                const route = yield select((state) => {
                    const userStatus = state.authorization.user.status;

                    if (userStatus === USER_STATUS_INVITED) {
                        return ROUTE_ACTIVATION;
                    }

                    const routeFromState = state.routing.locationBeforeTransitions.pathname;

                    if ([ROUTE_ACTIVATION, ROUTE_LOGIN, ROUTE_STORY_INFO, ROUTE_FORGOT_PASSWORD].indexOf(routeFromState) > -1) {
                        return ROUTE_DASHBOARD;
                    }

                    return routeFromState;
                });

                yield put(push(route));

                yield put(getListOfAccessRolesAction());
            } catch (ex) {
                yield put(authorizationFailureAction());
                yield put(push(ROUTE_LOGIN));
            }
        }),
        takeLatest(LOGIN, function * () {
            try {
                const { email, password } = yield select(
                    (state) => state.form.login.values
                );
                const response = yield call(apiLogin, {
                    email,
                    password,
                });
                const profile = response.data;

                yield put(loginSuccessAction(profile));

                let route = ROUTE_DASHBOARD;
                if (profile.status === USER_STATUS_INVITED) {
                    route = ROUTE_ACTIVATION;
                }

                yield put(push(route));

                yield put(getListOfAccessRolesAction());
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(LOGOUT, function * () {
            try {
                yield call(apiLogOut);
                yield put(push(ROUTE_LOGIN));
            } catch (ex) {
                // todo dispatch type error
            }
        }),
        takeLatest(FORGOT_PASSWORD, function * () {
            const { email } = yield select(
                (state) => state.form.forgotPassword.values
            );

            yield call(apiForgotPassword, { email });

            yield put(push(ROUTE_STORY_INFO));
        }),
    ];
}
