import {
    SET_ALL_REQUESTS,
    IS_LOADING,
} from "../actions/types";

const initialState = {
    loading: false,
    all: [],
    single: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_REQUESTS:
            return {
                ...state,
                all: action.payload,
                loading: false
            };
        case IS_LOADING:
            return {
                ...state,
                loading: action.payload,
                errors: {}
            };
        default:
            return state;
    }
};

export default authReducer;
