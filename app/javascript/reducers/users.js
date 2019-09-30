import {
    SET_ALL_USERS,
    IS_LOADING,
    UPDATE_USER_ROLE
} from "../actions/types";

const initialState = {
    loading: false,
    all: [],
};

const updateUser = (user, currentUsers) => {
    let newUsers = [];
    currentUsers.map(us => {
        if(us.id !== user.id) newUsers.push(us);
        else newUsers.push(user);
    });
    return newUsers;
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_USERS:
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
        case UPDATE_USER_ROLE:
            return {
                ...state,
                loading: false,
                all: updateUser(action.payload, state.all)
            };
        default:
            return state;
    }
};

export default usersReducer;
