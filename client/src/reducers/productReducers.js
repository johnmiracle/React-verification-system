/** @format */

import {
	PRODUCT_VERIFY_REQUEST,
	PRODUCT_VERIFY_SUCCESS,
	PRODUCT_VERIFY_FAIL,
	PRODUCT_VERIFY_RESET,
	PRODUCT_FARM_SAVE_DETAIL,
	PRODUCT_FARM_SAVE_DETAIL_RESET
} from '../constants/productConstants';

function productVerifyReducer(state = { verified: [] }, action) {
	switch (action.type) {
		case PRODUCT_VERIFY_REQUEST:
			return { loading: true };
		case PRODUCT_VERIFY_SUCCESS:
			return { loading: false, verified: action.payload, success: true };
		case PRODUCT_VERIFY_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_VERIFY_RESET:
			return {};
		default:
			return state;
	}
}

function farmPackageReducer(state = { farmInfo: {} }, action) {
	switch (action.type) {
		case PRODUCT_FARM_SAVE_DETAIL:
			return { farmInfo: action.payload };
		case PRODUCT_FARM_SAVE_DETAIL_RESET:
			return {};
		default:
			return state;
	}
}

export { productVerifyReducer, farmPackageReducer };
