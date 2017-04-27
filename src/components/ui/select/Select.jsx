import React, { Component, PropTypes } from 'react';

export default class Select extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            input: {
                name,
            },
            meta: {
                touched,
                error,
            },
            input,
            children,
        } = this.props;

        return (
            <div class={error && touched ? 'is-invalid' : ''}>
                <select
                    {...input}
                    name={name}
                >{children}</select>
                {touched && error && <span class="error">{error}</span>}
            </div>
        );
    }

}

const propTypes = {
    error: PropTypes.string,
    name: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
    children: PropTypes.node,
};
const defaultProps = {};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
