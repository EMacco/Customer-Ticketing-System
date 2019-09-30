import { combineReducers } from 'redux';
import authReducer from './auth';
import requestsReducer from './requests';
import usersReducer from './users';

export default combineReducers({
    auth: authReducer,
    requests: requestsReducer,
    users: usersReducer
});
