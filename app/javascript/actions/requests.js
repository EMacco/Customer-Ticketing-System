import axios from 'axios';
import {toast} from "react-toastify";
import {IS_LOADING, SET_ALL_REQUESTS, SET_SINGLE_REQUEST} from "./types";

export const isLoading = value => ({
    type: IS_LOADING,
    payload: value
});

export const setAllRequests = payload => ({
    type: SET_ALL_REQUESTS,
    payload
});

export const setSingleRequest = payload => ({
    type: SET_SINGLE_REQUEST,
    payload
});

export const fetchRequests = () => async dispatch => {
    try {
        dispatch(isLoading(true));

        const res = await axios.get('/requests');
        const requests = res.data.payload;
        dispatch(setAllRequests(requests));
        dispatch(isLoading(false));
    } catch (error) {
        dispatch(isLoading(false));
        if (error.response) {
            const errors = error.response.data.errors;
            if (errors.global) toast.error(errors.global);
            return;
        }
        toast.error('Please check your network connection and try again');
    }
};

export const createRequest = (data, history) => async dispatch => {
    try {
        dispatch(isLoading(true));
        const res = await axios.post('/requests', data);
        const request = res.data.payload;
        dispatch(isLoading(false));
        history.push(`/requests/${request.id}`);
        toast.success('Request has been created');
    } catch (error) {
        dispatch(isLoading(false));
        if (error.response) {
            const errors = error.response.data.errors;
            if (errors.global) toast.error(errors.global);
            return;
        }
        toast.error('Please check your network connection and try again');
    }
};

export const fetchSingleRequest = (pathName, history) => async dispatch => {
    try {
        dispatch(isLoading(true));
        const res = await axios.get(pathName);
        const request = res.data.payload;
        dispatch(setSingleRequest(request));
    } catch (error) {
        dispatch(isLoading(false));
        if (error.response) {
            const errors = error.response.data.errors;
            if (errors.global) history.push('/not-found');
            return;
        }
        toast.error('Please check your network connection and try again');
    }
};

export const closeRequest = (pathName) => async dispatch => {
    try {
        dispatch(isLoading(true));
        const res = await axios.delete(pathName);
        const request = res.data.payload;
        toast.success('Request has been closed');
        dispatch(setSingleRequest(request));
    } catch (error) {
        dispatch(isLoading(false));
        if (error.response) {
            const errors = error.response.data.errors;
            if (errors.global) history.push('/not-found');
            return;
        }
        toast.error('Please check your network connection and try again');
    }
};
