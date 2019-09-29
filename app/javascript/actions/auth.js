import axios from 'axios';
import { toast } from 'react-toastify';
import {
    SET_CURRENT_USER,
    LOGOUT_USER,
    IS_LOADING,
    SIGNIN_FAILURE
} from '../actions/types';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

export const isLoading = value => ({
    type: IS_LOADING,
    payload: value
});

export const logoutUser = history => dispatch => {
    dispatch({type: LOGOUT_USER });
    localStorage.removeItem('currentUser');
    if (history) history.push('/');
};
