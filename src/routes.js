import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from './store';
import history from './history';
import App from './containers/App';
import {
    ROUTE_DASHBOARD,
} from './constants/routes';

const rootRoute = {
    childRoutes: [{
        path: '/',
        component: App,
        indexRoute: {
            onEnter: (nextState, replace) => replace(ROUTE_DASHBOARD),
        },
        childRoutes: [
            require('./containers/login'),
            require('./containers/dashboard'),
            require('./containers/activation'),
        ],
    }],
};

const routes = (
    <Provider store={store}>
        <Router history={history} routes={rootRoute} />
    </Provider>
);

export default routes;
