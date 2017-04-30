import {
    FETCH_PARCELS_LIST,
    FETCH_DELIVERIES_LIST,
    FETCH_PARCELS_SUCCESS,
    FETCH_DELIVERIES_SUCCESS,
    REMOVE_PARCEL,
    REMOVE_PARCEL_SUCCESS,
    SHOW_PARCEL_INFO
} from '../constants/additional';



export const fetchParcels = (payload) => {
    return {
        type: FETCH_PARCELS_LIST,
        payload,
    };
};

export const fetchParcelsSuccess = (payload) => {
    return {
        type: FETCH_PARCELS_SUCCESS,
        payload,
    };
};

export const showParcelInfo = (id) => {
    return {
        type: SHOW_PARCEL_INFO,
        payload : id
    };
};

export const removeParcel = (id) => {
    return {
        type: REMOVE_PARCEL,
        id,
    };
};


export const removeParcelSuccess = (payload) => {
    return {
        type: REMOVE_PARCEL_SUCCESS,
        payload,
    };
};




export const fetchDeliveries = (payload) => {
    return {
        type: FETCH_DELIVERIES_LIST,
        payload,
    };
};

export const fetchDeliveriesSuccess = (payload) => {
    return {
        type: FETCH_DELIVERIES_SUCCESS,
        payload,
    };
};