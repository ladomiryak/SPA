import React, { Component, PropTypes } from 'react';

export default class Base extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
            <div class="page">
                <div class="row">
                    <div class="col-lg-12">{children}</div>
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

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;
