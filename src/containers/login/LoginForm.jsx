import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import validate from './form-validation/login';
import InputWithErrors from './../../components/ui/input/TextInput';

import {
    login as loginAction,
} from '../../actions/authorization';

@reduxForm({
    form: 'login',
    validate,
})
@connect(
    function mapStateToProps(state) {
        return {
            state
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    },
)
class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(loginAction());
    }

    render() {
        const invalid = !this.props.valid;

        return (
            <div className="col-lg-3 col-centered">
                <div className="widget login-form">
                    <span className="logo-image"></span>
                    <p>Login to Wodes CMS</p>
                    <form onSubmit={this.handleSubmit}>
                        <Field name="email"
                               type="email"
                               label="Email Adress"
                               component={InputWithErrors}
                        />
                        <Field name="password"
                               type="password"
                               label="Password"
                               component={InputWithErrors}
                        />
                        <button type="submit" className="btn login-btn" disabled={invalid}>Log in</button>
                    </form>
                    <Link to="story/forgot" class="forgot-pwd-link">
                        <button className="btn cancel-btn">Forgot your password?</button>
                    </Link>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    dispatch: PropTypes.func,
    valid: PropTypes.bool,
};
LoginForm.defaultProps = {};

export default LoginForm;
