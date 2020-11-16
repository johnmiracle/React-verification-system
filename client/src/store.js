import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  userSigninReducer,
  userRegisterReducer,
  userHistoryReducer,
} from "./reducers/userReducers";
import { productVerifyReducer } from "./reducers/productReducers";
import {
  productAddReducer,
  productCreateReducer,
  productListReducer,
  usersListReducer,
} from "./reducers/adminReducers";
import Cookie from "js-cookie";

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  productVerify: productVerifyReducer,
  userRegister: userRegisterReducer,
  adminAddProduct: productAddReducer,
  userHistory: userHistoryReducer,
  adminProductList: productListReducer,
  productCreate: productCreateReducer,
  adminUserList: usersListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
