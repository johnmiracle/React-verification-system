import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_HISTORY_REQUEST,
  USER_HISTORY_SUCCESS,
  USER_HISTORY_FAIL,
  USER_SIGNOUT,
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {}
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userHistoryReducer(state = { histories: [] }, action) {
  switch (action.type) {
    case USER_HISTORY_REQUEST:
      return { loading: true };
    case USER_HISTORY_SUCCESS:
      return { loading: false, histories: action.payload };
    case USER_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { userSigninReducer, userRegisterReducer, userHistoryReducer };
