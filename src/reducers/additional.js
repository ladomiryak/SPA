import {
    FETCH_PARCELS_SUCCESS,
    FETCH_DELIVERIES_SUCCESS,
    REMOVE_PARCEL,
    REMOVE_PARCEL_SUCCESS
} from '../constants/additional';
import {
    LOGOUT,
} from '../constants/authorization';

const defaultState = {
    parcelsList: {},
    deliveriesList: {}
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    let result = {};

    switch (type) {

        case FETCH_PARCELS_SUCCESS :
            result  =  {
                ...state,
                parcelsList : payload
            };
            return result;

        case FETCH_DELIVERIES_SUCCESS :
            result  =  {
                ...state,
                deliveriesList : payload
            };
            return result;

        case REMOVE_PARCEL_SUCCESS :
            result  =  {
                ...state,
                deliveriesList : payload
            };
            return result;

        default :
            return state;
    }
};
