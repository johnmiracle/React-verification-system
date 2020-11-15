import Axios from "axios";
import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
} from "../constants/adminConstants";

const addProduct = (productName, batchNumber, serialNumber, point) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: PRODUCT_ADD_REQUEST,
    payload: { productName, batchNumber, serialNumber, point },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/admin/code-generator",
      { productName, batchNumber, serialNumber, point },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
  }
};

export { addProduct };
