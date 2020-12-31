/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newFarm } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_ADDFARM_RESET } from '../constants/userConstants';

function NewFarm(props) {
	const [farmName, setFarmName] = useState('');
	const [farmSize, setFarmSize] = useState('');
	const [farmCapacity, setFarmCapacity] = useState('');
	const userAddFarm = useSelector((state) => state.userAddFarm);
	const { loading, error, farm } = userAddFarm;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(newFarm(farmName, farmSize, farmCapacity));
	};

	useEffect(() => {
		if (farm) {
			const timer = setTimeout(() => {
				dispatch({ type: USER_ADDFARM_RESET });
				props.history.push('/add_package/' + farm.newFarm._id);
			}, 2000);
			return () => clearTimeout(timer);
		}

		return () => {
			//
		};
	}, [props.history, farm, dispatch]);

	return (
		<>
			<div className="container">
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div className="mt-5">
						{farm && <MessageBox variant="success">{farm.message}</MessageBox>}
						<section id="cover" className="min-vh-100">
							<div id="cover-caption">
								<div className="container">
									<div className="row">
										<div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
											<h6 className="display-5 py-2">Create New Farm</h6>
											<div className="px-2">
												<form className="justify-content-center">
													<div className="form-group">
														<label className="">Name</label>
														<input
															type="text"
															className="form-control"
															placeholder="Pen A"
															onChange={(e) => setFarmName(e.target.value)}
														/>
													</div>
													<div className="form-group">
														<label className="">Farm Capacity</label>
														<input
															type="text"
															className="form-control"
															placeholder="Capacity of the farm"
															onChange={(e) => setFarmCapacity(e.target.value)}
														/>
													</div>
													<div className="form-group">
														<label className="">Farm Size</label>
														<input
															type="text"
															className="form-control"
															placeholder="Size of the farm"
															onChange={(e) => setFarmSize(e.target.value)}
															s
														/>
													</div>
													<button
														type="submit"
														onClick={submitHandler}
														className="btn btn-primary btn-sm"
													>
														Create New Farm
													</button>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				)}
			</div>
		</>
	);
}

export default NewFarm;
