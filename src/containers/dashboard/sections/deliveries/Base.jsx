import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const propTypes = {};
const defaultProps = {};

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
export default class Base extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
            <div className="page">{children}</div>
        );
    }

}

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;
