// Import Axios -- A library that helps us make HTTP requests, will use it in our thunk to make API calls
const axios = require("axios");

// Action Constants -- store action types as constants
const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_A_PRODUCT = "ADD_A_PRODUCT";
const DELETE_A_PRODUCT = "DELETE_A_PRODUCT"

// Action Creators -- functions that return an action object
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const addAProduct = (newProduct) => {
  return {
    type: ADD_A_PRODUCT,
    newProduct
  };
};

export const deleteAProduct = (product) => {
  return {
    type: DELETE_A_PRODUCT,
    product,
  }
}

// Thunk Creators - returns aysnc function that dispatches the action creator
// fetches the list of products
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
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await axios.post('/api/products', newProduct, { headers });
      const data = response.data;
      dispatch(addAProduct(data));
    } catch (error) {
      console.log(" !!! Error from the addNewProduct Thunk !!!", error)
    }
  }
}

// deletes a product [ admin ]
export const deleteAProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: token };
      const response = await axios.delete(`/api/products/${productId}`, { headers });
      const data = response.data;
      dispatch(deleteAProduct(data));
    } catch (error) {
      console.log("!!! Error from the deleteAProductThunk !!!")
    }
  }
}

// Reducer
const initialState = []
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_A_PRODUCT:
      return [...state, action.newProduct];
    case DELETE_A_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
