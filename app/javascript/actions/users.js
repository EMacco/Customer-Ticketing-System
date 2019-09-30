import axios from 'axios';
import { toast } from 'react-toastify';
import {
    SET_ALL_USERS,
    UPDATE_USER_ROLE
} from '../actions/types';

import {isLoading} from "./auth";

export const setAllUsers = payload => {
    return {
        type: SET_ALL_USERS,
        payload
    };
};

export const updateUserRole = payload => {
    return {
        type: UPDATE_USER_ROLE,
        payload
    }
};

export const fetchAllUsers = () => async dispatch => {
    try {
        dispatch(isLoading(true));
        const res = await axios.get('/users');
        const users = res.data.payload;
        dispatch(setAllUsers(users));
    } catch (error) {
        dispatch(isLoading(false));
        toast.error('Please check your network connection and try again');
    }
};

export const changeUserRole = (pathname, userRole) => async dispatch => {
    try {
        dispatch(isLoading(true));
        const res = await axios.patch(pathname, userRole);
        const user = res.data.payload;
        dispatch(updateUserRole(user));
        dispatch(isLoading(false));
        toast.success("User role has been successfully updated")
    } catch (error) {
        dispatch(isLoading(false));
        toast.error('Please check your network connection and try again');
    }
};
