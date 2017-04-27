import {
    EMAIL_VALIDATION_REGEXP,
} from '../../../constants/validationRules';
import {
    CAN_NOT_BE_BLANK,
    INCORRECT_EMAIL,
    PASSWORD_MIN_LENGTH_NOT_REACHED,
} from '../../../constants/errorMessages';

export default ({ email, password }) => {
    const errors = {};

    if (!email) {
        errors.email = CAN_NOT_BE_BLANK;
    } else if (!EMAIL_VALIDATION_REGEXP.test(email)) {
        errors.email = INCORRECT_EMAIL;
    }

    if (!password) {
        errors.password = CAN_NOT_BE_BLANK;
    } else if (password.length < 6) {
        errors.password = PASSWORD_MIN_LENGTH_NOT_REACHED;
    }

    return errors;
};
