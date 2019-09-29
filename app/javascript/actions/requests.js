import axios from 'axios';
import {toast} from "react-toastify";
import {IS_LOADING, SET_ALL_REQUESTS} from "./types";

export const isLoading = value => ({
    type: IS_LOADING,
    payload: value
});

export const setAllRequests = payload => ({
    type: SET_ALL_REQUESTS,
    payload
});

export const fetchRequests = () => async dispatch => {
    try {
        dispatch(isLoading(true));

        const res = await axios.get('/requests');
        const requests = res.data.payload;
        dispatch(setAllRequests(requests));
    } catch (error) {
        if (error.response) {
            const errors = error.response.data.errors;
            if (errors.global) toast.error(errors.global);
            return;
        }
        dispatch(isLoading(false));
        toast.error('Please check your network connection and try again');
    }
};
