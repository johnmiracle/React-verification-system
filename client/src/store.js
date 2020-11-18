/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userSigninReducer, userRegisterReducer, userHistoryReducer } from './reducers/userReducers';
import { productVerifyReducer } from './reducers/productReducers';
import {
	productAddReducer,
	productListReducer,
	usedProductListReducer,
	userDetailsReducer,
	usersListReducer
} from './reducers/adminReducers';

const initialState = {
	userSignin: {
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
	}
};
const reducer = combineReducers({
	userSignin: userSigninReducer,
	productVerify: productVerifyReducer,
	userRegister: userRegisterReducer,
	adminAddProduct: productAddReducer,
	userHistory: userHistoryReducer,
	adminProductList: productListReducer,
	adminUserList: usersListReducer,
	adminUserDetails: userDetailsReducer,
	adminProductUsedList: usedProductListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
