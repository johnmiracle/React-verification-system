import Axios from "axios";
import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_DOWNLOAD_REQUEST,
  PRODUCT_DOWNLOAD_SUCCESS,
  PRODUCT_DOWNLOAD_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
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

const productListDownload = () => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DOWNLOAD_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/admin/export", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DOWNLOAD_SUCCESS, success: true });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DOWNLOAD_FAIL, payload: message });
  }
};

const listProducts = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/admin/products", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
  }
};

const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USERS_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USERS_LIST_FAIL, payload: message });
  }
};

export { addProduct, productListDownload, listProducts, listUsers };
