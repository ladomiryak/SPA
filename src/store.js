import { createStore } from 'redux';
import reducers from './reducers';
import middleware from './middlewares';
import { runSaga } from './middlewares/saga';

const store = createStore(reducers, middleware);

runSaga();

export default store;
