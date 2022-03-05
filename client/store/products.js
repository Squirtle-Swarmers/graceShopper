// Import Axios -- A library that helps us make HTTP requests, will use it in our thunk to make API calls
const axios = require("axios");

// Action Constants -- store action types as constants
const SET_PRODUCTS = "SET_PRODUCTS";

// Action Creators -- functions that return an action object
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// Thunk Creators - returns aysnc function that dispatches the action creator
// fetches the list of campuses
export const fetchProductsThunk = () => {
    return async (dispatch) => {
      const response = await axios.get("/api/products");
      const products = response.data;
      dispatch(setProducts(products));
    };
};

// [ admin ] adds a new Product
export 

// Reducer
const initialState = []
export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCTS:
        return action.products;
      default:
        return state;
    }
}
