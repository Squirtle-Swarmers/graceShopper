import axios from "axios";

//Action Constants
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const UPDATE_SINGLE_PRODUCT = "UPDATE_SINGLE_PRODUCT"

//Action Creators
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

export const updateSingleProduct = (updatedProduct) => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
    updatedProduct,
  }
}

// Thunk Creators
export const fetchSingleProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      const singleProduct = response.data;
      dispatch(setSingleProduct(singleProduct));
    } catch (error) {
      console.log("!!! Error from fetchSingleProductThunk !!!", error);
    }
  };
};

export const updateSingleProductThunk = (product) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/campuses/${product.id}`, product);
      console.log("// [ updateSingleProductThunk ] - response: ", response)
      const updatedProduct = response.data;
      dispatch(updateSingleProduct(updatedProduct))
    } catch (error) {
      console.log("!!! Error from updateSingleProductThunk !!!", error)
    }
  }
}

// Reducer
const initialState = {};
function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    case UPDATE_SINGLE_PRODUCT:
      return action.updatedProduct;
    default:
      return state;
  }
}

export default singleProductReducer;