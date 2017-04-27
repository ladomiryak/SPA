import DashboardBase from './DashboardBase';

module.exports = {
    path: 'dashboard',
    component: DashboardBase,
    childRoutes: [
        require('./sections/users'),
        require('./sections/profile'),
        require('./sections/userProfile'),
        require('./sections/parcels'),
        require('./sections/deliveries'),
    ],
};
