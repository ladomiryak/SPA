import {
    CAN_NOT_BE_BLANK,
} from '../../../../../constants/errorMessages';

export default ({ oldSupervisor, newSupervisor }) => {
    const errors = {};

    if (!oldSupervisor) {
        errors.oldSupervisor = CAN_NOT_BE_BLANK;
    }

    if (!newSupervisor) {
        errors.newSupervisor = CAN_NOT_BE_BLANK;
    }

    return errors;
};
