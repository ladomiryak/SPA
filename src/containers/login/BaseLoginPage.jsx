import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import {
    AUTHORIZED,
} from '../../constants/authorization';
import {
    ROUTE_DASHBOARD,
} from '../../constants/routes';

@withRouter
@connect(
    function mapStateToProps(state) {
        return {
            authorizationStatus: state.authorization.status,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
class BaseLoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const { authorizationStatus, router } = this.props;

        if (authorizationStatus === AUTHORIZED) {
            router.replace(ROUTE_DASHBOARD);
        }
    }


    render() {
        const { children, authorizationStatus } = this.props;

        return (
            <div>
                <Header hideProfileData />
                <div class="container-fluid mt100">
                    {authorizationStatus === AUTHORIZED ? '' : children}
                </div>
            </div>
        );
    }

}

BaseLoginPage.propTypes = {
    children: PropTypes.node,
    authorizationStatus: PropTypes.string,
    router: PropTypes.object,
};
BaseLoginPage.defaultProps = {};

export default BaseLoginPage;
