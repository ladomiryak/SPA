import {
    EMAIL_VALIDATION_REGEXP,
} from '../../../constants/validationRules';
import {
    CAN_NOT_BE_BLANK,
    INCORRECT_EMAIL,
} from '../../../constants/errorMessages';

export default ({ email }) => {
    const errors = {};

    if (!email) {
        errors.email = CAN_NOT_BE_BLANK;
    } else if (!EMAIL_VALIDATION_REGEXP.test(email)) {
        errors.email = INCORRECT_EMAIL;
    }

    return errors;
};
