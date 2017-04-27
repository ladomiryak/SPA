import UsersBase from './Base';
import ProfilePreview from './Preview';
import ChangePasswordFrom from './ChangePasswordForm';

module.exports = {
    path: 'profile',
    component: UsersBase,
    indexRoute: {
        onEnter: (nextState, replace) => replace('dashboard/profile/view'),
    },
    childRoutes: [{
        path: 'view',
        component: ProfilePreview,
    }, {
        path: 'change-password',
        component: ChangePasswordFrom,
    }],
};
