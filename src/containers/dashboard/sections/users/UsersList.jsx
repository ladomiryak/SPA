import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import UserItem from './UserItem';
import Pagination from '../../../../components/pagination/PaginationBase';
import CreateUser from './Create';
import EditUser from './Edit';
import { push } from 'react-router-redux';
import {
    fetchUsers as fetchUsersAction,
    showCreateUserComponent as showCreateUserComponentAction,
    showEditUserComponent as showEditUserComponentAction
} from '../../../../actions/users';
import {
    fetchAvailableSupervisors as fetchAvailableSupervisorsAction,
} from '../../../../actions/additional';
import {
    COMPLETE_PREVIOUS_ACTION_MESSAGE,
} from '../../../../constants/infoMessages';

import {ROUTE_USER_PROFILE} from '../../../../constants/routes';
@connect(
    function mapStateToProps(state) {
        return {
            usersData: state.users,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class UsersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createNewUser: false,
            currentlySorted: 'fullName',
        };

        this.getPage = this.getPage.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleCreateUserClick = this.handleCreateUserClick.bind(this);
        this.handleCountPerPageChange = this.handleCountPerPageChange.bind(this);
        this.handleEditItemClick = this.handleEditItemClick.bind(this);
        this.handleOpenProfile = this.handleOpenProfile.bind(this);
        this.sort = this.sort.bind(this);
        this.dispatchSort = this.dispatchSort.bind(this);
    }


    componentDidMount() {
        this.getPage(1);
    }

    getPage(page) {
        const { dispatch } = this.props;

        dispatch(fetchUsersAction({
            page,
        }));
    }

    dispatchSort({ sortBy, sortOrder }) {
        const { dispatch } = this.props;

        dispatch(fetchUsersAction({
            sortBy,
            sortOrder,
        }));
    }

    sort(sortBy) {
        const { usersData } = this.props;
        const { query } = usersData;
        let sortOrder = -1;

        if (query.sortBy === sortBy) {
            sortOrder = query.sortOrder === 1 ? -1 : 1;
        }

        this.dispatchSort({
            sortBy,
            sortOrder,
        });

        this.state.currentlySorted = sortBy;
    }

    handleSearchInputChange(event) {
        const value = event.target.value;
        const { dispatch } = this.props;

        dispatch(fetchUsersAction({
            search: value,
            page: 1,
        }));
    }

    handleCreateUserClick() {
        const { dispatch, usersData } = this.props;

        if (!usersData.showCreateUserComponent) {
            dispatch(fetchAvailableSupervisorsAction({
                page: 1,
            }));
            dispatch(showCreateUserComponentAction());
        }
    }

    handleCountPerPageChange(event) {
        const value = event.target.value;
        const { dispatch } = this.props;

        dispatch(fetchUsersAction({
            count: value,
            page: 1,
        }));
    }

    handleEditItemClick(user) {
        const { dispatch, usersData } = this.props;

        if (usersData.editableUser) {
            return dispatch(showInfoPopupAction({
                message: COMPLETE_PREVIOUS_ACTION_MESSAGE,
            }));
        }

        dispatch(showEditUserComponentAction(user));
    }

    handleOpenProfile(id){
        const { dispatch } = this.props;
        dispatch(push(`${ROUTE_USER_PROFILE}/?id=${id}`));
    }


    render() {
        const { currentlySorted } = this.state;
        const { usersData } = this.props;
        const { editableUser } = usersData;
        const items = usersData.users.map((item) => {
            if (editableUser && editableUser._id === item._id) {
                return (
                    <EditUser key={item._id} editableUser={item} />
                );
            }

            return (
                <UserItem
                    key={item._id}
                    {...item}
                    handleEditItemClick={this.handleEditItemClick}
                    handleOpenProfile={this.handleOpenProfile}
                />
            );
        });
        const {
            query: {
                page,
            },
            totalPages,
            totalRecords,
            showCreateUserComponent,
        } = usersData;

        if(items !== undefined) {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-title">
                                <span className="name">users</span>
                                <span className="counter">{totalRecords}</span>
                                <div className="float-right">
                                    <button className="btn add-btn">
                                        <i className="icon-plus-button" onClick={this.handleCreateUserClick} />
                                    </button>
                                    <DebounceInput
                                        debounceTimeout={300}
                                        onChange={this.handleSearchInputChange}
                                        type="text"
                                        class="search-input"
                                        placeholder="Search for Users"
                                    />
                                    <i class="fa fa-search" />
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <table>
                                        <colgroup>
                                            <col width="10%" />
                                            <col width="15%" />
                                            <col width="20%" />
                                            <col width="20%" />
                                            <col width="15%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>Img</th>
                                            <th
                                                onClick={
                                                    () => {
                                                        this.sort('fullName');
                                                    }
                                                }
                                            >Name
                                                {currentlySorted === 'name' ? <i className="fa fa-sort" /> : ''}
                                            </th>
                                            <th
                                                onClick={
                                                    () => {
                                                        this.sort('dob');
                                                    }
                                                }
                                            >Dob
                                                {currentlySorted === 'dob' ? <i className="fa fa-sort" /> : ''}
                                            </th>
                                            <th
                                                onClick={
                                                    () => {
                                                        this.sort('email');
                                                    }
                                                }
                                            >Email Address
                                                {currentlySorted === 'email' ? <i className="fa fa-sort" /> : ''}
                                            </th>
                                            <th>Gender</th>
                                            <th>Phone</th>
                                            <th>Paypal synced</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {showCreateUserComponent ? <CreateUser /> : null}
                                        {items}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="widget-bottom row">
                                <div className="col-lg-6">
                                    {(totalPages)
                                        ? <Pagination
                                            handlePageClick={this.getPage}
                                            totalPages={totalPages}
                                            currentPage={page}
                                        />
                                        : ''
                                    }
                                </div>
                                <div className="col-lg-6">
                                    <div className="items-per-page float-right">
                                        <select onChange={this.handleCountPerPageChange}>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        <span>results per page</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }


    }
}

const propTypes = {
    usersData: PropTypes.object,
    dispatch: PropTypes.func,
};
const defaultProps = {};

UsersList.propTypes = propTypes;
UsersList.defaultProps = defaultProps;
