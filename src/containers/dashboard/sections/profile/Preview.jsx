import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    logout as logoutAction,
} from '../../../../actions/authorization';

@connect(
    function mapStateToProps(state) {
        return {
            profile: state.authorization.user,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class Preview extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        const { dispatch } = this.props;

        dispatch(logoutAction());
    }

    render() {
        const { profile } = this.props;

        return (
            <div class="card">
                <div class="card-title">
                    <span class="name">My Account</span>
                    <div class="float-right logout">
                        <a>
                            <span>Log out</span>
                            <i class="icon-logout" onClick={this.handleLogoutClick} />
                        </a>
                    </div>
                </div>
                <div class="card-content">
                    <div class="col-lg-5 col-centered user-profile">
                        <div class="row">
                            <div class="col-lg-6">
                                <img class="rounded-circle" src={profile.avatar} alt={profile.name} />
                            </div>
                            <div class="col-lg-6 user-info">
                                <p class="user-name">{profile.name}</p>
                                <p class="user-role">{profile.position}</p>
                                <Link to="dashboard/profile/change-password">Edit Password</Link>
                                <a>Change Account Picture</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const propTypes = {
    profile: PropTypes.object,
    dispatch: PropTypes.func,
};
const defaultProps = {};

Preview.propTypes = propTypes;
Preview.defaultProps = defaultProps;
