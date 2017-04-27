import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SidebarItem extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { link, name, icon } = this.props;

        return (
            <li>
                <Link to={link} class="btn btn-sidebar collapsed" activeClassName="active">
                    <span className="btn-title">{name}</span>
                    <span className="icon">
                        <i className={icon} />
                    </span>
                </Link>
            </li>
        );
    }

}

const propTypes = {
    link: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
};
const defaultProps = {};

SidebarItem.propTypes = propTypes;
SidebarItem.defaultProps = defaultProps;
