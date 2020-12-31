/** @format */

import Axios from 'axios';
import {
	PRODUCT_VERIFY_REQUEST,
	PRODUCT_VERIFY_SUCCESS,
	PRODUCT_VERIFY_FAIL,
	PRODUCT_FARM_SAVE_DETAIL
} from '../constants/productConstants';

const saveFarmDetail = (data) => (dispatch) => {
	dispatch({ type: PRODUCT_FARM_SAVE_DETAIL, payload: data });
	localStorage.setItem('farmInfo', JSON.stringify(data));
};

const verify = (code) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_VERIFY_REQUEST, payload: { code } });
  const {
    userSignin: { userInfo },
		farmPackage: { farmInfo }
	} = getState();
	try {
		const { data } = await Axios.post(
			'/api/user/verify-product',
			{ code, farmInfo },
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: PRODUCT_VERIFY_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: PRODUCT_VERIFY_FAIL, payload: message });
	}
};

export { verify, saveFarmDetail };
