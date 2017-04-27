import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import validate from './form-validation/createAndEdit';
import TextInput from '../../../../components/ui/input/TextInput';
import Select from '../../../../components/ui/select/Select';
import SelectWithPagination from '../../../../components/ui/select/SelectWithPagination';
import {
    createUser as createUserAction,
    closeCreateUserComponent as closeCreateUserComponentAction,
} from '../../../../actions/users';
import {
    fetchAvailableSupervisors as fetchAvailableSupervisorsAction,
} from '../../../../actions/additional';

@reduxForm({
    form: 'createUser',
    validate,
})
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
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            disableSupervisor: true,
        };
        this.saveUser = this.saveUser.bind(this);
        this.handleAccessRoleChange = this.handleAccessRoleChange.bind(this);
        this.getSupervisors = this.getSupervisors.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    getSupervisors(query) {
        const { dispatch } = this.props;

        dispatch(fetchAvailableSupervisorsAction(query));
    }

    handleAccessRoleChange(event) {
        const { accessRoles, dispatch } = this.props;
        const value = event.target.value;

        const selectedAccessRole = accessRoles.filter(role => {
            return role._id === value;
        })[0];

        dispatch(change('createUser', 'requireSupervisor', selectedAccessRole.requireSupervisor));
        this.setState({
            disableSupervisor: (value && !selectedAccessRole.requireSupervisor),
        });
    }

    handleCloseClick() {
        const { dispatch } = this.props;

        dispatch(closeCreateUserComponentAction());
    }

    saveUser() {
        const { dispatch } = this.props;

        dispatch(createUserAction());
    }

    render() {
        const { disableSupervisor } = this.state;
        const { accessRoles, availableSupervisors, valid } = this.props;
        const optionsForAccessRoleSelect = accessRoles.map((role) => {
            return (<option key={role._id} value={role._id}>{role.name}</option>);
        });

        return (
            <tr>
                <td>
                    <Field name="name" component={TextInput} type="text" />
                </td>
                <td>
                    <Field name="position" component={TextInput} type="text" />
                </td>
                <td>
                    <Field name="email" component={TextInput} type="text" />
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
                        type="text"
                        disabled={disableSupervisor}
                        data={availableSupervisors}
                        handlePaginationClick={this.getSupervisors}
                    />
                </td>
                <td>
                    <span />
                </td>
                <td class="table-options">
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
};
const defaultProps = {};

Create.propTypes = propTypes;
Create.defaultProps = defaultProps;
