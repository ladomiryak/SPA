import {
    CAN_NOT_BE_BLANK,
    INCORRECT_EMAIL,
} from '../../../../../constants/errorMessages';
import {
    EMAIL_VALIDATION_REGEXP,
} from '../../../../../constants/validationRules';

export default ({ name, position, email, accessRole, supervisor, requireSupervisor }) => {
    const errors = {};

    if (!name) {
        errors.name = CAN_NOT_BE_BLANK;
    }

    if (!position) {
        errors.position = CAN_NOT_BE_BLANK;
    }

    if (!email) {
        errors.email = CAN_NOT_BE_BLANK;
    } else if (!EMAIL_VALIDATION_REGEXP.test(email)) {
        errors.email = INCORRECT_EMAIL;
    }

    if (!accessRole) {
        errors.accessRole = CAN_NOT_BE_BLANK;
    }

    if (requireSupervisor && !supervisor) {
        errors.supervisor = CAN_NOT_BE_BLANK;
    }

    return errors;
};
