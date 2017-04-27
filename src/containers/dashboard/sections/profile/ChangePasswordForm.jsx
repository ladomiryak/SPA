import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import InputWithErrors from '../../../../components/ui/input/TextInput';
import validate from './form-validation/changePassword';
import {
    changePassword as changePasswordAction,
} from '../../../../actions/profile';

@reduxForm({
    form: 'changeProfilePassword',
    validate,
})
@connect(
    function mapStateToProps(state) {
        return {
            state,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(changePasswordAction());
    }

    render() {
        const invalid = !this.props.valid;

        return (
            <div class="card">
                <div class="card-title">
                    <span class="name">My Account></span>
                    <span class="name">Change password</span>
                </div>
                <div class="card-content">
                    <div class="col-lg-3 col-centered login-form">
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="oldPassword">Old Password</label>
                            <Field name="oldPassword" component={InputWithErrors} type="password" />
                            <label htmlFor="newPassword">New Password</label>
                            <Field name="newPassword" component={InputWithErrors} type="password" />
                            <label htmlFor="confirmNewPassword">Confirm new password</label>
                            <Field name="confirmNewPassword" component={InputWithErrors} type="password" />
                            <button type="submit" class="btn login-btn" disabled={invalid}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

const propTypes = {
    dispatch: PropTypes.func,
    valid: PropTypes.bool,
};
const defaultProps = {};

ChangePassword.propTypes = propTypes;
ChangePassword.defaultProps = defaultProps;
