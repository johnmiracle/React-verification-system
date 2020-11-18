/** @format */

import Axios from 'axios';
import {
	PRODUCT_ADD_REQUEST,
	PRODUCT_ADD_SUCCESS,
	PRODUCT_ADD_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	USERS_LIST_REQUEST,
	USERS_LIST_SUCCESS,
	USERS_LIST_FAIL,
	USED_PRODUCT_LIST_REQUEST,
	USED_PRODUCT_LIST_SUCCESS,
	USED_PRODUCT_LIST_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL
} from '../constants/adminConstants';

const addProduct = (productName, batchNumber, serialNumber, point) => async (dispatch, getState) => {
	dispatch({
		type: PRODUCT_ADD_REQUEST,
		payload: { productName, batchNumber, serialNumber, point }
	});
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await Axios.post(
			'/api/admin/code-generator',
			{ productName, batchNumber, serialNumber, point },
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
	}
};

const listProducts = () => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_LIST_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await Axios.get('/api/admin/products', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
	}
};

const listUsedProducts = () => async (dispatch, getState) => {
	dispatch({ type: USED_PRODUCT_LIST_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await Axios.get('/api/admin/used_product', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USED_PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USED_PRODUCT_LIST_FAIL, payload: message });
	}
};

const listUsers = () => async (dispatch, getState) => {
	dispatch({ type: USERS_LIST_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await Axios.get('/api/admin/users', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USERS_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USERS_LIST_FAIL, payload: message });
	}
};

const userDetails = (userId) => async (dispatch, getState) => {
	dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await Axios.get('/api/admin/user/' + userId, {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
	}
};

export { addProduct, listProducts, listUsers, userDetails, listUsedProducts };
