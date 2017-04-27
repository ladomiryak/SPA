import { combineReducers } from 'redux';
import routing from './routing';
import form from './form';
import authorization from './authorization';
import users from './users';
import additional from './additional';
import popup from './popup';

const rootReducer = combineReducers({
    routing,
    form,
    authorization,
    users,
    additional,
    popup,
});

export default rootReducer;
