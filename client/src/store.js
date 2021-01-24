/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
	userSigninReducer,
	userRegisterReducer,
	userHistoryReducer,
	userLocationReducer,
	userAddFarmReducer,
	userAllFarmsReducer,
	userFarmDetailReducer,
	userAddFarmDetailsReducer,
	userLogReducer,
	userUpdateReducer,
	userDetailReducer,
	userImageUploadReducer
} from './reducers/userReducers';
import { farmPackageReducer, productVerifyReducer } from './reducers/productReducers';
import {
	adminChartsReducer,
	adminDashboardReducer,
	productAddReducer,
	productListReducer,
	usedProductListReducer,
	userDetailsReducer,
	usersListReducer
} from './reducers/adminReducers';

const initialState = {
	userRegister: {
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
	},
	userSignin: {
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
	},
	farmPackage: {
		farmInfo: localStorage.getItem('farmInfo') ? JSON.parse(localStorage.getItem('farmInfo')) : null
	}
};

const reducer = combineReducers({
	userSignin: userSigninReducer,
	farmPackage: farmPackageReducer,
	productVerify: productVerifyReducer,
	userRegister: userRegisterReducer,
	userLocation: userLocationReducer,
	userAddFarm: userAddFarmReducer,
	userAddFarmDetails: userAddFarmDetailsReducer,
	userAllFarms: userAllFarmsReducer,
	userFarmDetails: userFarmDetailReducer,
	userUpdate: userUpdateReducer,
	userDetail: userDetailReducer,
	adminAddProduct: productAddReducer,
	userHistory: userHistoryReducer,
	adminProductList: productListReducer,
	adminUserList: usersListReducer,
	adminUserDetails: userDetailsReducer,
	adminProductUsedList: usedProductListReducer,
	adminDashBoardInfo: adminDashboardReducer,
	userLogs: userLogReducer,
	userProfileImage: userImageUploadReducer,
	adminDashboardCharts: adminChartsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
