import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import InputWithErrors from '../../components/ui/input/TextInput';
import validate from './form-validation/forgotPassword';
import {
    forgotPassword as forgotPasswordAction,
} from '../../actions/authorization';

@reduxForm({
    form: 'forgotPassword',
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
    },
)
class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(forgotPasswordAction());
    }

    render() {
        const invalid = !this.props.valid;

        return (
            <div class="col-lg-3 col-centered">
                <div class="widget login-form">
                    <span class="logo-image"></span>
                    <p>I forgot my password</p>
                    <form onSubmit={this.handleSubmit}>
                        <Field type="email"
                               name="email"
                               label="Email Adress"
                               component={InputWithErrors}
                        />
                        <button type="submit" class="btn login-btn" disabled={invalid}>Submit</button>
                    </form>
                    <Link to="story/login" class="forgot-pwd-link"><button class="btn cancel-btn">Cancel</button></Link>
                </div>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    dispatch: PropTypes.func,
    valid: PropTypes.bool,
};

ForgotPasswordForm.defaultProps = {};

export default ForgotPasswordForm;
