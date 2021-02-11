/** @format */

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
	USER_ADDFARM_REQUEST,
	USER_ADDFARM_SUCCESS,
	USER_ADDFARM_FAIL,
	USER_FARMS_REQUEST,
	USER_FARMS_SUCCESS,
	USER_FARMS_FAIL,
	USER_ADDFARM_RESET,
	USER_FARM_DETAIL_REQUEST,
	USER_FARM_DETAIL_SUCCESS,
	USER_FARM_DETAIL_FAIL,
	USER_ADDFARM_DETAILS_REQUEST,
	USER_ADDFARM_DETAILS_SUCCESS,
	USER_ADDFARM_DETAILS_FAIL,
	USER_ADDFARM_DETAILS_RESET,
	USER_LOGS_REQUEST,
	USER_LOGS_SUCCESS,
	USER_LOGS_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
	USER_DETAIL_REQUEST,
	USER_DETAIL_SUCCESS,
	USER_DETAIL_FAIL,
	USER_REGISTER_RESET,
	USER_IMAGEUPLOAD_REQUEST,
	USER_IMAGEUPLOAD_SUCCESS,
	USER_IMAGEUPLOAD_FAIL
} from '../constants/userConstants';

function userSigninReducer(state = {}, action) {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return { loading: true };
		case USER_SIGNIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_SIGNOUT:
			return {};
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
		case USER_REGISTER_RESET:
			return {};
		default:
			return state;
	}
}

function userAddFarmReducer(state = {}, action) {
	switch (action.type) {
		case USER_ADDFARM_REQUEST:
			return { loading: true };
		case USER_ADDFARM_SUCCESS:
			return { loading: false, farm: action.payload, success: true };
		case USER_ADDFARM_FAIL:
			return { loading: false, error: action.payload };
		case USER_ADDFARM_RESET:
			return {};
		default:
			return state;
	}
}

function userAddFarmDetailsReducer(state = {}, action) {
	switch (action.type) {
		case USER_ADDFARM_DETAILS_REQUEST:
			return { loading: true };
		case USER_ADDFARM_DETAILS_SUCCESS:
			return { loading: false, farm: action.payload, success: true };
		case USER_ADDFARM_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_ADDFARM_DETAILS_RESET:
			return {};
		default:
			return state;
	}
}

function userAllFarmsReducer(state = { farms: [] }, action) {
	switch (action.type) {
		case USER_FARMS_REQUEST:
			return { loading: true };
		case USER_FARMS_SUCCESS:
			return { loading: false, farms: action.payload, success: true };
		case USER_FARMS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function userFarmDetailReducer(state = { farm: {} }, action) {
	switch (action.type) {
		case USER_FARM_DETAIL_REQUEST:
			return { loading: true };
		case USER_FARM_DETAIL_SUCCESS:
			return { loading: false, farm: action.payload };
		case USER_FARM_DETAIL_FAIL:
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

function userLogReducer(state = { logs: {} }, action) {
	switch (action.type) {
		case USER_LOGS_REQUEST:
			return { loading: true };
		case USER_LOGS_SUCCESS:
			return { loading: false, logs: action.payload };
		case USER_LOGS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function userUpdateReducer(state = {}, action) {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_RESET:
			return {};
		default:
			return state;
	}
}

function userDetailReducer(state = { userDatas: {} }, action) {
	switch (action.type) {
		case USER_DETAIL_REQUEST:
			return { loading: true };
		case USER_DETAIL_SUCCESS:
			return { loading: false, userDatas: action.payload };
		case USER_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

function userImageUploadReducer(state = {}, action) {
	switch (action.type) {
		case USER_IMAGEUPLOAD_REQUEST:
			return { loading: true };
		case USER_IMAGEUPLOAD_SUCCESS:
			return { loading: false, userImg: action.payload, success: true };
		case USER_IMAGEUPLOAD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export {
	userSigninReducer,
	userRegisterReducer,
	userAddFarmReducer,
	userAddFarmDetailsReducer,
	userHistoryReducer,
	userAllFarmsReducer,
	userFarmDetailReducer,
	userLogReducer,
	userUpdateReducer,
	userDetailReducer,
	userImageUploadReducer
};
