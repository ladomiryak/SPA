import {
    ROUTE_TO_USERS_LIST,
    ROUTE_TO_PARCELS,
    ROUTE_TO_DELIVERIES,
    ROUTE_TO_STATISTICS
} from './routes';


const deliveries = {
    name: 'Deliveries',
    link: ROUTE_TO_DELIVERIES,
    icon: 'icon-sent',
};

const parcels = {
    name: 'Parcels',
    link: ROUTE_TO_PARCELS,
    icon: 'icon-cube',
};

const users = {
    name: 'Users',
    link: ROUTE_TO_USERS_LIST,
    icon: 'icon-user',
};

const statistics = {
    name: 'Statistics',
    link: ROUTE_TO_STATISTICS,
    icon: 'icon-pie-chart',
};


export const ADMIN_MENU = [
    users,
    deliveries,
    parcels,
    statistics
];

