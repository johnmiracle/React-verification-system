/** @format */

import {
	PRODUCT_ADD_REQUEST,
	PRODUCT_ADD_SUCCESS,
	PRODUCT_ADD_FAIL,
	PRODUCT_ADD_RESET,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	USERS_LIST_REQUEST,
	USERS_LIST_SUCCESS,
	USERS_LIST_FAIL,
	USED_PRODUCT_LIST_REQUEST,
	USED_PRODUCT_LIST_SUCCESS,
	USED_PRODUCT_LIST_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	ADMIN_DASHBOARD_REQUEST,
	ADMIN_DASHBOARD_FAIL,
	ADMIN_DASHBOARD_SUCCESS
} from '../constants/adminConstants';

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productAddReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_ADD_REQUEST:
			return { loading: true };
		case PRODUCT_ADD_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_ADD_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_ADD_RESET:
			return {};
		default:
			return state;
	}
};

export const usedProductListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case USED_PRODUCT_LIST_REQUEST:
			return { loading: true };
		case USED_PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case USED_PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const usersListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USERS_LIST_REQUEST:
			return { loading: true };
		case USERS_LIST_SUCCESS:
			return { loading: false, users: action.payload };
		case USERS_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { histories: [] }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, histories: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const adminDashboardReducer = (state = { dashboardInfo: {} }, action) => {
	switch (action.type) {
		case ADMIN_DASHBOARD_REQUEST:
			return { loading: true };
		case ADMIN_DASHBOARD_SUCCESS:
			return { loading: false, dashboardInfo: action.payload };
		case ADMIN_DASHBOARD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
