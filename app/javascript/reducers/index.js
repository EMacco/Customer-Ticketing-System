import { combineReducers } from 'redux';
import authReducer from './auth';
import requestsReducer from './requests';

export default combineReducers({
    auth: authReducer,
    requests: requestsReducer
});
