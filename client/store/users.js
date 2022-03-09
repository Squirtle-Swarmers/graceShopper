// Import Axios -- A library that helps us make HTTP requests, will use it in our thunk to make API calls
const axios = require("axios");

// Action Constants -- store action types as constants
const SET_USERS = "SET_USERS";

// Action Creators -- functions that return an action object
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    };
};
// Thunk Creators - returns aysnc function that dispatches the action creator
// fetches the list of users
export const fetchUsersThunk = () => {
    return async (dispatch) => {
        const response = await axios.get("/api/users");
        console.log("// Logging response from fetchUsersThunk: ", response)
        const users = response.data;
        dispatch(setUsers(users));
    };
};

// Reducer
const initialState = []
export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            return action.users;
        default:
            return state;
    }
}