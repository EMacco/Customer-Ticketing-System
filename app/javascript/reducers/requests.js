import {
    SET_ALL_REQUESTS,
    IS_LOADING, SET_SINGLE_REQUEST,
    ADD_COMMENT
} from "../actions/types";

const initialState = {
    loading: false,
    all: [],
    single: {},
};

const addComment = (newComment, currentRequest) => {
    let newComments = currentRequest.comments;
    newComments.push(newComment);
    return {
        ...currentRequest,
        comments: newComments
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_REQUESTS:
            return {
                ...state,
                all: action.payload,
                loading: false
            };
        case SET_SINGLE_REQUEST:
            return {
                ...state,
                single: action.payload,
                loading: false
            };
        case IS_LOADING:
            return {
                ...state,
                loading: action.payload,
                errors: {}
            };
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                single: addComment(action.payload, state.single)
            }
        default:
            return state;
    }
};

export default authReducer;
