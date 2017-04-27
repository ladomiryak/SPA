import React, { Component, PropTypes } from 'react';

export default class SubordinateItem extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { name, email } = this.props;

        return (
            <tr>
                <td>
                    <span class="name">{name}</span>
                </td>
                <td>{email}</td>
            </tr>
        );
    }

}

const propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
};
const defaultProps = {};

SubordinateItem.propTypes = propTypes;
SubordinateItem.defaultProps = defaultProps;
