import axios from "axios";

//Action Constants
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

//Action Creators
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

// Thunk Creators
export const fetchSingleProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      const singleProduct = response.data;
      dispatch(setSingleProduct(singleProduct));
    } catch (error) {
      console.log("+++ Error from singleProduct Thunk Creator +++", error);
    }
  };
};

// Reducer
const initialState = {};
function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
        return action.singleProduct;
    default:
      return state;
  }
}

export default singleProductReducer;