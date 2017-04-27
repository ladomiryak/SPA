import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import { Link } from 'react-router';
import validate from './form-validation/createAndEdit';
import TextInput from '../../../../components/ui/input/TextInput';
import Select from '../../../../components/ui/select/Select';
import SelectWithPagination from '../../../../components/ui/select/SelectWithPagination';
import {
    editUser as editUserAction,
    cancelEditUser as cancelEditUserAction,
    prepareUserToChangeStatus as prepareUserToChangeStatusAction,
} from '../../../../actions/users';
import {
    fetchAvailableSupervisors as fetchAvailableSupervisorsAction,
} from '../../../../actions/additional';
import {
    USER_STATUS_ACTIVE,
} from '../../../../constants/profile';
import {
    CHANGE_USER_STATUS_ACTION_DISABLE,
    CHANGE_USER_STATUS_ACTION_ENABLE,
    CONFIRM_CHANGE_STATUS_OF_USER,
} from '../../../../constants/users';

import {
    CONFIRM_CHANGE_STATUS_OF_USER_MESSAGE,
} from '../../../../constants/infoMessages';
import {
    ROUTE_TO_MANAGE_SUBORDINATES,
} from '../../../../constants/routes';

@connect(
    function mapStateToProps(state) {
        const {
            records,
            totalPages,
            totalRecords,
            query,
        } = state.additional.supervisors;

        return {
            accessRoles: state.additional.accessRoles,
            availableSupervisors: {
                records,
                totalPages,
                totalRecords,
                query,
            },
            initialValues: state.users.editableUser,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
@reduxForm({
    form: 'editUser',
    validate,
})
export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            disableSupervisor: true,
            showManageButton: false,
        };
        this.saveUser = this.saveUser.bind(this);
        this.handleAccessRoleChange = this.handleAccessRoleChange.bind(this);
        this.getSupervisors = this.getSupervisors.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }

    componentWillMount() {
        const { dispatch, accessRoles, editableUser } = this.props;
        const selectedAccessRole = accessRoles.find(role => {
            return role._id === editableUser.accessRole._id;
        });

        dispatch(change('editUser', 'requireSupervisor', selectedAccessRole.requireSupervisor));
        this.setState({
            disableSupervisor: (!selectedAccessRole.requireSupervisor),
        });

        dispatch(fetchAvailableSupervisorsAction({
            page: 1,
        }));
    }

    componentWillUnmount() {
        this.handleCloseClick();
    }

    getSupervisors(query) {
        const { dispatch } = this.props;

        dispatch(fetchAvailableSupervisorsAction(query));
    }

    handleAccessRoleChange(event) {
        const { accessRoles, dispatch } = this.props;
        const value = event.target.value;

        const selectedAccessRole = accessRoles.find(role => {
            return role._id === value;
        });

        dispatch(change('editUser', 'requireSupervisor', selectedAccessRole.requireSupervisor));
        this.setState({
            disableSupervisor: (value && !selectedAccessRole.requireSupervisor),
        });
    }

    handleCloseClick() {
        const { dispatch } = this.props;

        dispatch(cancelEditUserAction());
    }

    changeUserStatus() {
        const { dispatch, editableUser } = this.props;
        let action;

        if (editableUser.employees > 0) {
            // todo show message that user can not be disabled if he has subordinates
            return this.setState({
                showManageButton: true,
            });
        }

        if (editableUser.status === USER_STATUS_ACTIVE) {
            action = CHANGE_USER_STATUS_ACTION_DISABLE;
        } else {
            action = CHANGE_USER_STATUS_ACTION_ENABLE;
        }

        dispatch(prepareUserToChangeStatusAction({
            userId: editableUser._id,
            action,
        }));
        dispatch(showConfirmPopupAction({
            message: CONFIRM_CHANGE_STATUS_OF_USER_MESSAGE,
            action: CONFIRM_CHANGE_STATUS_OF_USER,
        }));
    }

    saveUser() {
        const { dispatch, editableUser } = this.props;

        dispatch(editUserAction(editableUser._id));
    }

    render() {
        const { disableSupervisor, showManageButton } = this.state;
        const {
            accessRoles,
            availableSupervisors,
            editableUser,
            valid,
        } = this.props;

        const optionsForAccessRoleSelect = accessRoles.map((role) => {
            return (
                <option
                    key={role._id}
                    value={role._id}
                >{role.name}</option>
            );
        });

        return (
            <tr>
                <td>
                    <Field
                        name="name"
                        component={TextInput}
                        type="text"
                    />
                </td>
                <td>
                    <Field
                        name="position"
                        component={TextInput} type="text"
                    />
                </td>
                <td>
                    <Field
                        name="email"
                        component={TextInput}
                        type="text"
                    />
                </td>
                <td>
                    <Field
                        name="accessRole"
                        component={Select}
                        onChange={this.handleAccessRoleChange}
                    >
                        {optionsForAccessRoleSelect}
                    </Field>
                </td>
                <td>
                    <Field
                        name="supervisor"
                        component={SelectWithPagination}
                        disabled={disableSupervisor}
                        data={availableSupervisors}
                        handlePaginationClick={this.getSupervisors}
                        initialValue={editableUser.supervisor}
                    />
                </td>
                <td>
                    <span />
                </td>
                <td class="table-options">
                    {
                        showManageButton
                            ? <Link to={`${ROUTE_TO_MANAGE_SUBORDINATES}/${editableUser._id}`}>Manage</Link>
                            : ''
                    }
                    <i
                        class="icon-letter-x"
                        onClick={this.changeUserStatus}
                    />
                    <i
                        class={`icon-sent ${valid ? '' : 'disabled'}`}
                        onClick={this.saveUser}
                    />
                    <i
                        class="icon-letter-x"
                        onClick={this.handleCloseClick}
                    />
                </td>
            </tr>
        );
    }

}

const propTypes = {
    dispatch: PropTypes.func,
    valid: PropTypes.bool,
    accessRoles: PropTypes.array,
    availableSupervisors: PropTypes.object,
    editableUser: PropTypes.object,
};
const defaultProps = {};

Create.propTypes = propTypes;
Create.defaultProps = defaultProps;
