import axios from "axios";
import Cookies from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_HISTORY_REQUEST,
  USER_HISTORY_SUCCESS,
  USER_HISTORY_FAIL,
} from "../constants/userConstants";

const signin = (phone, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { phone, password } });
  try {
    const { data } = await axios.post("/api/login", { phone, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const logout = () => (dispatch) => {
  Cookies.remove("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

const register = (firstName, lastName, phone, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { firstName, lastName, phone, password },
  });
  try {
    const { data } = await axios.post("/api/register", {
      firstName,
      lastName,
      phone,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const listHistoryMine = () => async (dispatch, getState) => {
  dispatch({ type: USER_HISTORY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/user/history", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_HISTORY_FAIL, payload: error.message });
  }
};

export { signin, register, logout, listHistoryMine };
