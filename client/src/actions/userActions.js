/** @format */

import axios from 'axios';
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
	USER_LOCATION_REQUEST,
	USER_LOCATION_SUCCESS,
	USER_LOCATION_FAIL,
	USER_ADDFARM_REQUEST,
	USER_ADDFARM_SUCCESS,
	USER_ADDFARM_FAIL,
	USER_FARMS_REQUEST,
	USER_FARMS_SUCCESS,
	USER_FARMS_FAIL,
	USER_FARM_DETAIL_REQUEST,
	USER_FARM_DETAIL_SUCCESS,
	USER_FARM_DETAIL_FAIL,
	USER_ADDFARM_DETAILS_REQUEST,
	USER_ADDFARM_DETAILS_SUCCESS,
	USER_ADDFARM_DETAILS_FAIL,
	USER_LOGS_REQUEST,
	USER_LOGS_SUCCESS,
	USER_LOGS_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_DETAIL_REQUEST,
	USER_DETAIL_SUCCESS,
	USER_DETAIL_FAIL,
	USER_IMAGEUPLOAD_REQUEST,
	USER_IMAGEUPLOAD_SUCCESS,
	USER_IMAGEUPLOAD_FAIL
} from '../constants/userConstants';

const signin = (phone, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { phone, password } });
	try {
		const { data } = await axios.post('/api/login', { phone, password });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	localStorage.removeItem('farmInfo');
	dispatch({ type: USER_SIGNOUT });
};

const register = (firstName, lastName, phone, password, state, city, cluster) => async (dispatch) => {
	dispatch({
		type: USER_REGISTER_REQUEST,
		payload: { firstName, lastName, phone, password, state, city, cluster }
	});
	try {
		const { data } = await axios.post('/api/register', {
			firstName,
			lastName,
			phone,
			password,
			state,
			city,
			cluster
		});
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

const location = (state, city, cluster) => async (dispatch, getState) => {
	dispatch({
		type: USER_LOCATION_REQUEST,
		payload: { state, city, cluster }
	});
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.post(
			'/api/location',
			{
				state,
				city,
				cluster
			},
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: USER_LOCATION_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_LOCATION_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

const newFarm = (farmName, farmSize, farmCapacity) => async (dispatch, getState) => {
	dispatch({
		type: USER_ADDFARM_REQUEST,
		payload: {
			farmName,
			farmSize,
			farmCapacity
		}
	});
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.post(
			'/api/user/add_farm',
			{
				farmName,
				farmSize,
				farmCapacity
			},
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: USER_ADDFARM_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_ADDFARM_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

const newFarmDetails = (
	farmId,
	farmType,
	poultryType,
	numOfStock,
	farmDays,
	farmDueDay,
	numOfDOC,
	numOfFeed,
	stockingDate,
	expectedPoints
) => async (dispatch, getState) => {
	dispatch({
		type: USER_ADDFARM_DETAILS_REQUEST,
		payload: {
			farmId,
			farmType,
			poultryType,
			numOfStock,
			farmDays,
			farmDueDay,
			numOfDOC,
			numOfFeed,
			stockingDate,
			expectedPoints
		}
	});
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.post(
			'/api/user/add_farm/' + farmId,
			{
				farmType,
				poultryType,
				numOfStock,
				farmDays,
				farmDueDay,
				numOfDOC,
				numOfFeed,
				stockingDate,
				expectedPoints
			},
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: USER_ADDFARM_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_ADDFARM_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

const listHistoryMine = () => async (dispatch, getState) => {
	dispatch({ type: USER_HISTORY_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.get('/api/user/history', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_HISTORY_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_HISTORY_FAIL, payload: message });
	}
};

const listAllFarms = () => async (dispatch, getState) => {
	dispatch({ type: USER_FARMS_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.get('/api/user/all-farms', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_FARMS_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_FARMS_FAIL, payload: message });
	}
};

const userFarmDetail = (farmId) => async (dispatch, getState) => {
	dispatch({ type: USER_FARM_DETAIL_REQUEST, payload: farmId });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.get('/api/user/farm/' + farmId, {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_FARM_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_FARM_DETAIL_FAIL, payload: message });
	}
};

const userLog = () => async (dispatch, getState) => {
	dispatch({ type: USER_LOGS_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.get('/api/user/profile', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_LOGS_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_LOGS_FAIL, payload: message });
	}
};

const update = ({ userId, firstName, lastName, phone, address, state, city, cluster }) => async (
	dispatch,
	getState
) => {
	const {
		userSignin: { userInfo }
	} = getState();
	dispatch({
		type: USER_UPDATE_REQUEST,
		payload: { userId, firstName, lastName, phone, address, state, city, cluster }
	});
	try {
		const { data } = await axios.post(
			'/api/user/' + userId,
			{ firstName, lastName, phone, address, state, city, cluster },
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_UPDATE_FAIL, payload: message });
	}
};

const detail = () => async (dispatch, getState) => {
	dispatch({ type: USER_DETAIL_REQUEST });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.get('/api/user/detail', {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_DETAIL_FAIL, payload: message });
	}
};

const upload = (userImg) => async (dispatch, getState) => {
	dispatch({ type: USER_IMAGEUPLOAD_REQUEST, payload: userImg });
	const {
		userSignin: { userInfo }
	} = getState();
	try {
		const { data } = await axios.post('/api/user/profile_image', userImg, {
			headers: { Authorization: `Bearer ${userInfo.token}` }
		});
		dispatch({ type: USER_IMAGEUPLOAD_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({ type: USER_IMAGEUPLOAD_FAIL, payload: message });
	}
};

export {
	signin,
	register,
	location,
	newFarm,
	newFarmDetails,
	logout,
	listHistoryMine,
	listAllFarms,
	userFarmDetail,
	userLog,
	update,
	detail,
	upload
};
