import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form';
import InputWithErrors from '../../components/ui/input/TextInput';
import Header from '../../components/Header';
import validate from './form-validation/activation';
import {
    UNAUTHORIZED,
} from '../../constants/authorization';
import {
    ROUTE_LOGIN,
    ROUTE_DASHBOARD,
} from '../../constants/routes';
import {
    USER_STATUS_ACTIVE,
} from '../../constants/profile';
import {
    activateProfile as activateProfileAction,
} from '../../actions/profile';

@reduxForm({
    form: 'activation',
    validate,
})
@connect(
    function mapStateToProps(state) {
        return {
            authorizationStatus: state.authorization.status,
            userStatus: state.authorization.user.status,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class Base extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { authorizationStatus, userStatus, dispatch } = this.props;

        if (authorizationStatus === UNAUTHORIZED) {
            return dispatch(push(ROUTE_LOGIN));
        }

        if (userStatus === USER_STATUS_ACTIVE) {
            return dispatch(push(ROUTE_DASHBOARD));
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(activateProfileAction());
    }

    render() {
        const invalid = !this.props.valid;

        return (
            <div>
                <Header />
                <div class="page">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-title">
                                    <span class="name">Account activation></span>
                                    <span class="name">Set new password</span>
                                </div>
                                <div class="card-content">
                                    <div class="col-lg-3 col-centered login-form">
                                        <form onSubmit={this.handleSubmit}>
                                            <label htmlFor="newPassword">New Password</label>
                                            <Field name="newPassword" component={InputWithErrors} type="password" />
                                            <label htmlFor="confirmNewPassword">Confirm new password</label>
                                            <Field name="confirmNewPassword" component={InputWithErrors} type="password" />
                                            <button type="submit" class="btn login-btn" disabled={invalid}>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const propTypes = {
    dispatch: PropTypes.func,
    authorizationStatus: PropTypes.string,
    userStatus: PropTypes.string,
    valid: PropTypes.bool,
};
const defaultProps = {};

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;
