import {
    CLOSE,
    SHOW_CONFIRM_POPUP,
    SHOW_INFO_POPUP,
} from '../constants/popup';

export const close = () => {
    return {
        type: CLOSE,
        payload: {},
    };
};

export const showConfirmPopup = (payload) => {
    return {
        type: SHOW_CONFIRM_POPUP,
        payload,
    };
};

export const showInfoPopup = (payload) => {
    return {
        type: SHOW_INFO_POPUP,
        payload,
    };
};
