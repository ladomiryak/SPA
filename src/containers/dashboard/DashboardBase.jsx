import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from '../../components/Header';
import ContainerFluid from './ContainerFluid';
import {
    AUTHORIZED,
    UNAUTHORIZED,
} from '../../constants/authorization';
import {
    ROUTE_LOGIN
} from '../../constants/routes';


@connect(
    function mapStateToProps(state) {
        return {
            authorizationStatus: state.authorization.status,
            userStatus: state.authorization.user.status
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class DashboardBase extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { authorizationStatus, userStatus, dispatch } = this.props;

        if (authorizationStatus === UNAUTHORIZED) {
            return dispatch(push(ROUTE_LOGIN));
        }
    }

    render() {
        const { children, authorizationStatus } = this.props;

        return (
            <div>
                <Header />
                {authorizationStatus === AUTHORIZED ? <ContainerFluid>{children}</ContainerFluid> : ''}
            </div>
        );
    }
}

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element,
    ]),
    authorizationStatus: PropTypes.string,
    userStatus: PropTypes.string,
    dispatch: PropTypes.func,
};
const defaultProps = {};

DashboardBase.propTypes = propTypes;
DashboardBase.defaultProps = defaultProps;
