import {
    CAN_NOT_BE_BLANK,
    PASSWORD_MIN_LENGTH_NOT_REACHED,
    PASSWORD_CONFIRM_DOES_NOT_MATCH,
} from '../../../constants/errorMessages';
import {
    PASSWORD_MIN_LENGTH,
} from '../../../constants/validationRules';

export default ({ newPassword, confirmNewPassword }) => {
    const errors = {};

    if (!newPassword) {
        errors.newpPassword = CAN_NOT_BE_BLANK;
    } else if (newPassword.length < PASSWORD_MIN_LENGTH) {
        errors.newpPassword = PASSWORD_MIN_LENGTH_NOT_REACHED;
    }

    if (!confirmNewPassword) {
        errors.confirmNewPassword = CAN_NOT_BE_BLANK;
    } else if (confirmNewPassword.length < PASSWORD_MIN_LENGTH) {
        errors.confirmNewPassword = PASSWORD_MIN_LENGTH_NOT_REACHED;
    } else if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = PASSWORD_CONFIRM_DOES_NOT_MATCH;
    }

    return errors;
};
