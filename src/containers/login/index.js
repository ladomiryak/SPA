import BaseLoginPage from './BaseLoginPage';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import Info from './Info';

module.exports = {
    path: 'story',
    component: BaseLoginPage,
    childRoutes: [{
        path: 'login',
        component: LoginForm,
    }, {
        path: 'forgot',
        component: ForgotPasswordForm,
    }, {
        path: 'info',
        component: Info,
    }],
};
