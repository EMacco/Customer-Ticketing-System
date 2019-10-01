import axios from 'axios';
import {toast} from 'react-toastify';
import {ADD_COMMENT} from './types';
import {isLoading} from "./requests";

const addNewComment = payload => ({
    type: ADD_COMMENT,
    payload
});

export const createComment = (pathName, commentText) => async dispatch => {
    try {
        dispatch(isLoading(true));

        const res = await axios.post(pathName, commentText);
        const comment = res.data.payload;
        dispatch(addNewComment(comment));
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
