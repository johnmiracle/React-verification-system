/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detail, listAllFarms, userLog } from '../actions/userActions';
import 'react-circular-progressbar/dist/styles.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function Profile(props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [cluster, setCluster] = useState('');

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const userAllFarms = useSelector((state) => state.userAllFarms);
	const { loading, farms, error } = userAllFarms;

	const userLogs = useSelector((state) => state.userLogs);
	const { loading: logsLoading, error: logsError, logs } = userLogs;

	const userDetail = useSelector((state) => state.userDetail);
	const { loading: detailLoading, userData } = userDetail;

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(update({ userId: userInfo._id, firstName, lastName, phone, address, state, city, cluster }));
	// };

	// const userUpdate = useSelector((state) => state.userUpdate);
	// const { loading: loadingUpdate, success, error: UpdateError } = userUpdate;

	const dispatch = useDispatch();
	useEffect(() => {
		if (userInfo) {
			console.log(userInfo.firstName);
			setFirstName(userInfo.firstName);
			setLastName(userInfo.lastName);
			setPhone(userInfo.phone);
			setAddress(userInfo.address);
			setState(userInfo.state);
			setCity(userInfo.city);
			setCluster(userInfo.cluster);
		}
		dispatch(userLog());
		dispatch(listAllFarms());
		dispatch(detail());
		return () => {
			//
		};
	}, [dispatch, userInfo]);

	return (
		<>
			<div className="container mt-5 mb-5 ">
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div>
						<div className="container">
							<div className="row my-2">
								<div className="col-lg-4 order-lg-1 text-center">
									<img
										src="//placehold.it/150"
										className="mx-auto img-fluid img-circle d-block"
										alt="avatar"
									/>
									<h6 className="mt-2">Upload a different photo</h6>
									<label className="custom-file">
										<input type="file" id="file" className="custom-file-input" />
										<span className="custom-file-control">Choose file</span>
									</label>
								</div>
								<div className="col-lg-8 order-lg-2">
									<ul className="nav nav-tabs">
										<li className="nav-item">
											<Link
												data-target="#profile"
												data-toggle="tab"
												className="nav-link active"
											>
												Profile
											</Link>
										</li>
										<li className="nav-item">
											<Link data-target="#farms" data-toggle="tab" className="nav-link">
												FarmSured Benefits
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href=""
												data-target="#edit"
												data-toggle="tab"
												className="nav-link"
											>
												other info
											</Link>
										</li>
									</ul>
									<div className="tab-content py-4">
										<div className="tab-pane active" id="profile">
											<h5 className="mb-3">User Profile</h5>
											<div className="row">
												<div className="col-md-12">
													<div className="row">
														<div className="col-md-4">
															<h6>
																<b>Name</b>
															</h6>
															<p>
																{userInfo.firstName} {userInfo.lastName}
															</p>
															<h6>
																<b>Phone</b>
															</h6>
															<p>0{userInfo.phone}</p>
														</div>
														<div className="col-md-4">
															<h6>
																<b>Location</b>
															</h6>
															<p>State: {userInfo.state || 'Not Filled Yet'}</p>
															<p>City: {userInfo.city || 'Not Filled Yet'}</p>
														</div>
														<div className="col-md-4">
															<h6 className="mr-auto">
																<b>Cluster</b>
															</h6>
															<p>{userInfo.cluster || 'Not Filled Yet'}</p>
														</div>
													</div>
												</div>

												<div className="col-md-12">
													<h5 className="mt-2">
														<span className="fa fa-clock-o ion-clock float-right"></span>
														Recent Activity
													</h5>
													<table className="table table-sm table-hover table-striped">
														<tbody>
															{logsLoading ? (
																<LoadingBox></LoadingBox>
															) : logsError ? (
																<MessageBox variant="danger">
																	{error}
																</MessageBox>
															) : (
																<>
																	{logs.length > 0 ? (
																		<>
																			{logs.map((log) => (
																				<tr>
																					<td>
																						<span class="float-right font-weight-bold">
																							<strong>
																								<Moment
																									fromNow
																								>
																									{
																										log.createdAt
																									}
																								</Moment>
																							</strong>
																						</span>
																						{log.activity}
																					</td>
																				</tr>
																			))}
																		</>
																	) : (
																		<p className="center">No Activities done</p>
																	)}
																</>
															)}
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div class="tab-pane" id="farms">
											<div className="">
												<h6>
													NB:{' '}
													<span>
														To qualify for the FarmSured Benefits, you must earn
														2000 Points
													</span>
												</h6>

												<h6 className="mt-3">
													Total Points:{' '}
													<span class="float-right font-weight-bold">
														{userData} Points
													</span>
												</h6>

												<h6 className="mt-4">
													{detailLoading ? (
														<LoadingBox></LoadingBox>
													) : (
														<>
															FarmSured Benfits:
															{userData >= 2000 ? (
																<>
																	<span class="float-right font-weight-bold green p-3">
																		Qualified
																	</span>
																</>
															) : (
																<>
																	<span class="float-right font-weight-bold red p-3">
																		Not Qualified
																	</span>
																</>
															)}
														</>
													)}
												</h6>
											</div>

											<div className="mt-5">
												<p className="ml-3 mt-2">
													<i className="fa fa-check"></i> Free Farm Insurance
												</p>
												<div className="table-responsive">
													<table class="table table-hover table-striped">
														<tbody>
															{farms.length > 0 ? (
																<>
																	{farms.map((farm) => (
																		<tr>
																			<td>
																				<span class="float-right font-weight-bold">
																					Protected
																				</span>
																				- {farm.farm_name}
																			</td>
																		</tr>
																	))}
																</>
															) : (
																<p className="center">No Farm Created</p>
															)}
														</tbody>
													</table>
												</div>
											</div>
											<p className="ml-3 mt-1">
												<i className="fa fa-check"></i> Free Health Insurance
											</p>
											<div className="ml-5">
												<p className="">
													- 4 persons access to basic medicial insurance
												</p>
											</div>
										</div>
										<div className="tab-pane" id="edit">
											<form>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														First name
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															value={firstName}
															type="firstname"
															name="firstname"
															id="first_name"
															onChange={(e) => setFirstName(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														Last name
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															value={lastName}
															type="lastname"
															name="lastname"
															id="last_name"
															onChange={(e) => setLastName(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														Phone
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															value={phone}
															type="phone"
															name="phone"
															id="phone"
															onChange={(e) => setPhone(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														Address
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															type="text"
															value={address}
															placeholder="Address"
															onChange={(e) => setAddress(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label"></label>
													<div className="col-lg-5">
														<input
															className="form-control"
															type="text"
															value={state}
															placeholder="State"
															onChange={(e) => setState(e.target.value)}
														/>
													</div>
													<div className="col-lg-4">
														<input
															className="form-control"
															type="text"
															value={city}
															placeholder="City"
															onChange={(e) => setCity(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														Cluster
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															type="Cluster"
															id="Cluster"
															name="Cluster"
															value={cluster}
															onChange={(e) => setCluster(e.target.value)}
														></input>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label"></label>
													<div className="col-lg-9">
														<input
															type="reset"
															className="btn btn-secondary"
															value="Cancel"
														/>
														<input
															type="submit"
															className="btn btn-primary"
															value="Save Changes"
														/>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Profile;
