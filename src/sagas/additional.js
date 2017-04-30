import axios from 'axios';
import {push} from 'react-router-redux';
import {takeLatest} from 'redux-saga';
import {select, call, put} from 'redux-saga/effects';
import {
    API_URL,
    API_GET_PARCELS_LIST,
    API_GET_DELIVERIES_LIST,
    API_REMOVE_PARCEL
} from '../constants/api';
import {
    ROUTE_TO_PARCEL_INFO,
} from '../constants/routes';
import {
    FETCH_PARCELS_LIST,
    FETCH_DELIVERIES_LIST,
    REMOVE_PARCEL,
    SHOW_PARCEL_INFO
} from '../constants/additional';

import {
    fetchParcelsSuccess as fetchParcelsActionSuccess,
    fetchDeliveriesSuccess as fetchDeliveriesActionSuccess,
    removeParcelSuccess as removeParcelActionSuccess
} from '../actions/additional';


const apiFetchParcels = () => {
    return axios.get(`${API_URL}${API_GET_PARCELS_LIST}?type=all`, {})
        .then(response => response.data);
};

const apiRemoveParcel = (id) => {
    return axios.delete(`${API_URL}${API_REMOVE_PARCEL}/${id}`, {})
        .then(response => response.data);
};

/*const apiParcelInfo = (id) => {
    return axios.delete(`${API_URL}${API_REMOVE_PARCEL}/${id}`, {})
        .then(response => response.data);
};*/

const apiFetchDeliveries = () => {
    return axios.get(`${API_URL}${API_GET_DELIVERIES_LIST}?type=all`, {})
        .then(response => response.data);
};

export default function () {
    return [

        takeLatest(FETCH_PARCELS_LIST, function *() {
            try {

                const response = yield call(apiFetchParcels);

                yield put(fetchParcelsActionSuccess(response));
            } catch (ex) {
                // todo dispath type error
            }
        }),

        takeLatest(FETCH_DELIVERIES_LIST, function *() {
            try {

                const response = yield call(apiFetchDeliveries);

                yield put(fetchDeliveriesActionSuccess(response));
            } catch (ex) {
                // todo dispath type error
            }
        }),

        takeLatest(SHOW_PARCEL_INFO, function *() {
            try {

                yield put(push(ROUTE_TO_PARCEL_INFO));
            } catch (ex) {
                // todo dispath type error
            }
        }),


        takeLatest(REMOVE_PARCEL, function *() {

            const payload = yield select(
                state => state.popup.custom
            );

            try {
                const response = yield call(apiRemoveParcel, payload);

                yield put(removeParcelActionSuccess(response));
            } catch (ex) {
                // todo dispath type error
            }
        }),
    ];
}
