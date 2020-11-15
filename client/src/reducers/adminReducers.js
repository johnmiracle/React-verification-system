import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_RESET,
} from "../constants/adminConstants";

function productAddReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADD_RESET:
      return {};
    default:
      return state;
  }
}

export { productAddReducer };
