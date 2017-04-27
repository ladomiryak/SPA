import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    logout as logoutAction,
} from '../actions/authorization';
import {
    AUTHORIZED,
} from '../constants/authorization';
import {
    ROUTE_LOGIN,
    ROUTE_DASHBOARD,
} from '../constants/routes';

@connect(
    function mapStateToProps(state) {
        return {
            profile: state.authorization.user,
            authorizationStatus: state.authorization.status,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        const {dispatch} = this.props;
        dispatch(logoutAction());
    }

    render() {
        const {
            authorizationStatus,
        } = this.props;
        const rootUrl = (authorizationStatus === AUTHORIZED)
            ? ROUTE_DASHBOARD
            : ROUTE_LOGIN;

        return (
            <nav className="navbar">
                <div className="nav nav-inline navbar-left">
                    <div className="nav-item">
                        <div className="nav-link toggle-right-sidebar">
                            <div className="logo float-left">
                                <Link to={rootUrl}>
                                    <span className="logo-image"></span>
                                    <span>Wodes</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="logout">
                    <span onClick={this.handleLogoutClick}>
                    {authorizationStatus === 'AUTHORIZED' ? 'Log out' : ''}
                    </span>
                </div>
            </nav>
        );
    }
}

const propTypes = {
    hideProfileData: PropTypes.bool,
    profile: PropTypes.object,
    dispatch: PropTypes.func,
    authorizationStatus: PropTypes.string,
};
const defaultProps = {};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
