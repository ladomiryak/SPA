import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarItem from './SidebarItem';
import {
    ADMIN_MENU,
} from '../../constants/sidebar';

@connect(
    function mapStateToProps(state) {

        return {
            userAccessRoleLevel: state.authorization
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: ADMIN_MENU,
        };
    }

    render() {
        const { items } = this.state;
        const menuItems = items.map(item => {
            return (
                <SidebarItem key={item.name} {...item} />
            );
        });

        return (
            <div className="left-sidebar">
                <div className="wrapper">
                    <div className="content">
                        <div className="left-sidebar-section">
                            <ul>
                                {menuItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const propTypes = {
    userAccessRoleLevel: PropTypes.number,
};
const defaultProps = {};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
