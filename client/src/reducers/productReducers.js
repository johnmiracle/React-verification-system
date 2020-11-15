import {
  PRODUCT_VERIFY_REQUEST,
  PRODUCT_VERIFY_SUCCESS,
  PRODUCT_VERIFY_FAIL,
  PRODUCT_VERIFY_RESET,
} from "../constants/productConstants";

function productVerifyReducer(state = { verified: [] }, action) {
  switch (action.type) {
    case PRODUCT_VERIFY_REQUEST:
      return { loading: true };
    case PRODUCT_VERIFY_SUCCESS:
      return { loading: false, verified: action.payload, success: true };
    case PRODUCT_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_VERIFY_RESET:
      return {};
    default:
      return state;
  }
}

export { productVerifyReducer };
