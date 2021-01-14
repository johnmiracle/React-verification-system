/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newFarmDetails } from '../actions/userActions';
import Moment from 'react-moment';
import moment from 'moment';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { USER_ADDFARM_DETAILS_RESET } from '../constants/userConstants';

function AddFarm(props) {
	const [farmType, setFarmType] = useState('');
	const [poultryType, setPoultryType] = useState('');
	const [numOfStock, setNumOfStock] = useState(Number);
	const [farmDays, setFarmDays] = useState(Number);
	const [stockingDate, setStockingDate] = useState(Date);

	const userAddFarmDetails = useSelector((state) => state.userAddFarmDetails);
	const { loading, farm, error } = userAddFarmDetails;

	const numOfDOC = Math.round(numOfStock / 50);
	const numOfFeed = numOfDOC * 7;

	const farmDueDate = moment(stockingDate, 'YYYY-MM-DD').add(farmDays, 'd');

	// Point Calculator
	const expectedPoints = (numOfDOC + numOfFeed) * 10;

	if (poultryType === 'Broiler') {
	}
	if (poultryType === 'Layer') {
	}
	if (poultryType === 'Noiler') {
	}
	let farmId = props.match.params.id;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			newFarmDetails(
				farmId,
				farmType,
				poultryType,
				numOfStock,
				farmDays,
				farmDueDate,
				numOfDOC,
				numOfFeed,
				stockingDate,
				expectedPoints
			)
		);
	};

	useEffect(() => {
		if (farm) {
			const timer = setTimeout(() => {
				dispatch({ type: USER_ADDFARM_DETAILS_RESET });
				props.history.push('/farm_package/' + props.match.params.id);
			}, 2000);
			return () => clearTimeout(timer);
		}
		return () => {
			//
		};
	}, [props.history, farm, dispatch, props.match.params.id]);

	return (
		<>
			<div className="container mb-4">
				{loading ? (
					<LoadingBox></LoadingBox>
				) : (
					<div className="farm-form">
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						{farm && <MessageBox variant="success">{farm.message}</MessageBox>}
						<form onSubmit={submitHandler}>
							<div className="row">
								<div className="col-md-6">
									<div>
										<p className="text-center">Add a new Farm to start earning points</p>
										<div className="form-group " id="">
											<label className="">Farm Type </label>
											<select
												class="custom-select custom-select mb-3"
												onChange={(e) => setFarmType(e.target.value)}
												placeholder="Select a Farm Type"
											>
												<option selected>Select a Farm Type</option>
												<option value="Poultry Farming">Poultry Farming</option>
												<option value="Crop Farming">Crop Farming</option>
												<option value="Fish Farming">Fish Farming</option>
											</select>
										</div>

										<div className="form-group" id="">
											<label className="">Poultry Farm Type </label>
											<select
												class="custom-select custom-select mb-3"
												onChange={(e) => setPoultryType(e.target.value)}
												placeholder="Select a Poultry Farm Type"
												required
											>
												<option selected>Select a Poultry Farm Type</option>
												<option value="Broiler">Broiler</option>
												<option value="Layer">Layer</option>
												<option value="Noiler">Noiler</option>
											</select>
										</div>

										<div className="note-container">
											<h6>IMPORTANT NOTES:</h6>
											<p className="">
												1. FOR DAY OLD CHICKS: You must verify each box at the point
												of purchase and activate them on your farm.
											</p>
											<p className="">
												2. You are expected to comply with the set standards for your
												farming enterprise.
											</p>
										</div>

										<div className="form-group">
											<label className="">How many Birds do you want to stock </label>
											<input
												name=""
												className="form-control"
												placeholder="Number of Stock"
												type="number"
												onChange={(e) => setNumOfStock(e.target.value)}
												required
											/>
										</div>

										<div className="form-group">
											<label className="">Stocking Date </label>
											<input
												name=""
												className="form-control"
												placeholder="Stocking Date"
												type="date"
												onChange={(e) => setStockingDate(e.target.value)}
												required
											/>
										</div>

										<div className="form-group">
											<label className="">How many Birds do you want to stock </label>
											<select
												class="custom-select custom-select mb-3"
												onChange={(e) => setFarmDays(e.target.value)}
												placeholder="Select a Poultry Farm Type"
											>
												<option value="Select Number of days">
													Select Number of days
												</option>
												<option value="60">51 - 60 Days</option>
												<option value="70">60 - 70 Days</option>
											</select>
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<p className="">
										The Standards in the box green is a must for you to comply with, to
										enjoy FARMSURED benefits
									</p>
									<div className="comply-box">
										<p> Farm Type: {farmType || null} </p>
										<p> Poultry Farming Type: {poultryType || null}</p>
										<p> Duration: {farmDays || null}</p>
										<p>
											Stocking Date: <Moment format="DD/MM/YYYY">{stockingDate}</Moment>
										</p>
										<p>
											Due Date:{' '}
											<Moment format="DD/MM/YYYY">{farmDueDate || 'Empty'}</Moment>
										</p>
										<p> No of Stock Birds: {numOfStock || '0'}</p>
										<p> No of Day Old Chick Box(es): {numOfDOC || '0'}</p>
										<p> No of Feed(s): {numOfFeed || '0'} Bags</p>
										<p> Expected Points: {expectedPoints || '0'} Points</p>
										<p>
											Expected Av. Weight:
											{poultryType === 'Broiler'
												? ' 1.2kg LW'
												: poultryType === 'Layer'
												? ' 1.7Kg LW'
												: poultryType === 'Noiler'
												? ' 1.5Kg LW'
												: null}
										</p>
									</div>
								</div>
							</div>
							<div className="form-group mt-4 mb-4">
								<button
									type="submit"
									className="btn btn-primary btn-block"
									onClick={submitHandler}
								>
									AGREE TO CONTINUE
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</>
	);
}

export default AddFarm;
