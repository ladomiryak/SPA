import UsersBase from './Base';
import UsersList from './UsersList';
import ManageSubordinates from './ManageSubordinates';

module.exports = {
    path: 'users',
    component: UsersBase,
    indexRoute: {
        onEnter: (nextState, replace) => replace('dashboard/users/list'),
    },
    childRoutes: [{
        path: 'list',
        component: UsersList,
    }, {
        path: 'manage-subordinates/:userId',
        component: ManageSubordinates,
    }],
};
