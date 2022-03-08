// Import Axios -- A library that helps us make HTTP requests, will use it in our thunk to make API calls
const axios = require("axios");

// Action Constants -- store action types as constants
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Action Creators -- functions that return an action object
export const setCart = (order) => {
  return {
    type: SET_CART,
    order,
  };
};

export const removeFromCart = (order) => {
  return {
    type: REMOVE_FROM_CART,
    order,
  }
}

// Thunk Creators - returns aysnc function that dispatches the action creator
// fetches the list of campuses
export const fetchOrderThunk = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/users/${userId}/orders`);
    const cart = response.data//.orders.filter((order) => order.status === "unfulfilled");
    console.log("// [fetchOrderThunk ] - response.data", cart);
    dispatch(setCart(cart));
  };
};

export const removeFromCartThunk = (userId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, {"productId": productId, "quantityChange": 0});
      const data = response.data;
      console.log(data);
      dispatch(setCart(data));
    } catch (error) {
      console.log("!!! Error from the deleteAProductThunk !!!")
    }
  }
}


// Reducer
const initialState = {}
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.order;
    default:
      return state;
  }
}
