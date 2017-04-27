import { applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import sagaMiddleware from './saga';
import routerMiddleware from './router';
import logger from './logger';

const middleware = compose(
    applyMiddleware(
        logger,
        thunkMiddleware,
        routerMiddleware,
        sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : devTools => devTools
);

export default middleware;
