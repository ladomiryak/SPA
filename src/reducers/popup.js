import {
    CLOSE,
    SHOW_CONFIRM_POPUP,
    SHOW_INFO_POPUP,
} from '../constants/popup';

const defaultState = {
    show: false,
    message: null,
    action: null,
    confirm: false,
    info: false,
    custom: false,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {

        case SHOW_CONFIRM_POPUP :
            return {
                ...defaultState,
                show: true,
                confirm: true,
                action: payload.action,
                message: payload.message,
                custom : payload.custom
            };

        case SHOW_INFO_POPUP :
            return {
                ...defaultState,
                show: true,
                info: true,
                message: payload.message,
            };

        case CLOSE :
            return defaultState;

        default :
            return state;
    }
};
