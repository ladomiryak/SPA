import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';

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
export default class ContainerFluid extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
            <div class="container-fluid">
                <div class="row">
                    <Sidebar />
                    <div class="col-xs-12 main">{children}</div>
                </div>
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
};
const defaultProps = {};

ContainerFluid.propTypes = propTypes;
ContainerFluid.defaultProps = defaultProps;
