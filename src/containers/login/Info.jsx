import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Info extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div class="col-lg-3 col-centered">
                <div class="widget login-form">
                    <span class="logo-image"></span>
                    <p>Info</p>
                    <form>
                        <div>Request for reset password performed successfully.</div>
                        <div>Check your email.</div>
                    </form>
                    <Link to="story/login" class="forgot-pwd-link">
                        <button class="btn cancel-btn">Go to login page</button>
                    </Link>
                </div>
            </div>
        );
    }

}

const propTypes = {};
const defaultProps = {};

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;
