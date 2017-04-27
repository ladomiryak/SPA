import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import SubordinateItem from './SubordinateItem';
import SelectWithPagination from '../../../../components/ui/select/SelectWithPagination';
import validate from './form-validation/manageSubordinates';
import {
    fetchAvailableSupervisors as fetchAvailableSupervisorsAction,
} from '../../../../actions/additional';
import {
    submitNewSupervisor as submitNewSupervisorAction,
    prepareStateForManagingSubordinates as prepareStateForManagingSubordinatesAction,
} from '../../../../actions/users';

@reduxForm({
    form: 'manageSubordinates',
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
            editableUserSubordinates: state.users.editableUserSubordinates,
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
export default class ChangeSupervisor extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.getSupervisors = this.getSupervisors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { dispatch, params } = this.props;

        dispatch(change('manageSubordinates', 'oldSupervisor', params.userId));
        dispatch(prepareStateForManagingSubordinatesAction(params.userId));
    }

    getSupervisors(query) {
        const { dispatch } = this.props;

        dispatch(fetchAvailableSupervisorsAction(query));
    }

    handleSubmit() {
        const { dispatch } = this.props;

        dispatch(submitNewSupervisorAction());
    }

    render() {
        const {
            editableUserSubordinates,
            availableSupervisors,
            valid,
        } = this.props;
        const invalid = !valid;
        const items = editableUserSubordinates.map(model => {
            return (
                <SubordinateItem key={model.key} {...model} />
            );
        });

        return (
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-title">
                            <span class="name">Change supervisor</span>
                        </div>
                        <div class="card-content">
                            <div class="col-lg-12 p0">
                                <div class="table-responsive">
                                    <table>
                                        <colgroup>
                                            <col width="50%" />
                                            <col width="50%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                    <i class="fa fa-sort" />
                                                </th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items}
                                        </tbody>
                                    </table>
                                </div>
                                <Field
                                    name="newSupervisor"
                                    component={SelectWithPagination}
                                    data={availableSupervisors}
                                    handlePaginationClick={this.getSupervisors}
                                />
                                <button class="btn" onClick={this.handleSubmit} disabled={invalid}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const propTypes = {
    editableUserSubordinates: PropTypes.array,
    availableSupervisors: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    valid: PropTypes.bool,
};
const defaultProps = {};

ChangeSupervisor.propTypes = propTypes;
ChangeSupervisor.defaultProps = defaultProps;
