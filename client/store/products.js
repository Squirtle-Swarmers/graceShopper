// Import Axios -- A library that helps us make HTTP requests, will use it in our thunk to make API calls
const axios = require("axios");

// Action Constants -- store action types as constants
const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_A_Product = "ADD_A_PRODUCT"

// Action Creators -- functions that return an action object
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const addAProduct = (newProduct) => {
  return {
    type: ADD_A_Product,
    newProduct
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

// adds a new Product [ admin ]
export const addNewProductThunk = (newProduct) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/products');
      const newProduct = response.data; 
      dispatch(addAProduct(newProduct));
    }catch ( error ) {
      console.log(" !! Error from the addNewProduct Thunk !!", error)
    }
  }
}

// Reducer
const initialState = []
export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCTS:
        return action.products;
      case ADD_A_Product: 
        return [...state, action.newProduct]
      default:
        return state;
    }
}
