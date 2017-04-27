import { compose } from 'redux';
import persistState from 'redux-localstorage';
import middleware from './middlewares';

const stateEnhancer = compose(
    middleware,
    persistState(null, {
        slicer: (paths) => {
            return (state) => {
                return state;
            };
        },
    }),
);

export default stateEnhancer;
