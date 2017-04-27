import authorization from './authorization';
import users from './users';
import profile from './profile';
import additional from './additional';

function * mySaga() {
    return yield [
        ...authorization(),
        ...users(),
        ...profile(),
        ...additional()
    ];
}

export default mySaga;
