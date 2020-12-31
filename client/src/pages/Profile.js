/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllFarms } from '../actions/userActions';
import 'react-circular-progressbar/dist/styles.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

function Profile(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const userAllFarms = useSelector((state) => state.userAllFarms);
	const { loading, farms, error } = userAllFarms;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listAllFarms());
		return () => {
			//
		};
	}, [dispatch]);

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
												<div className="col-md-6">
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
													<h6>
														<b>Location</b>
													</h6>
													<p>State: {userInfo.state || 'Not Filled Yet'}</p>
													<p>City: {userInfo.city || 'Not Filled Yet'}</p>
													<h6>
														<b>Cluster</b>
													</h6>
													<p>{userInfo.cluster || 'Not Filled Yet'}</p>
												</div>

												{/* <div className="col-md-12">
													<h5 className="mt-2">
														<span className="fa fa-clock-o ion-clock float-right"></span>{' '}
														Recent Activity
													</h5>
													<table className="table table-sm table-hover table-striped">
														<tbody>
															<tr>
																<td>
																	<strong>Abby</strong> joined ACME Project
																	Team in <strong>`Collaboration`</strong>
																</td>
															</tr>
															<tr>
																<td>
																	<strong>Gary</strong> deleted My Board1 in{' '}
																	<strong>`Discussions`</strong>
																</td>
															</tr>
															<tr>
																<td>
																	<strong>Kensington</strong> deleted
																	MyBoard3 in <strong>`Discussions`</strong>
																</td>
															</tr>
															<tr>
																<td>
																	<strong>John</strong> deleted My Board1 in{' '}
																	<strong>`Discussions`</strong>
																</td>
															</tr>
															<tr>
																<td>
																	<strong>Skell</strong> deleted his post
																	Look at Why this is.. in{' '}
																	<strong>`Discussions`</strong>
																</td>
															</tr>
														</tbody>
													</table>
												</div> */}
											</div>
										</div>
										<div class="tab-pane" id="farms">
											<div className="">
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
																				</span>{' '}
																				- {farm.farm_name}
																			</td>
																		</tr>
																	))}
																</>
															) : (
																'No Farm Created'
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
															type="text"
															value={userInfo.firstName}
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
															type="text"
															value={userInfo.lastName}
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
															value=""
															placeholder="Street"
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label"></label>
													<div className="col-lg-6">
														<input
															className="form-control"
															type="text"
															value={userInfo.city}
															placeholder="City"
														/>
													</div>
													<div className="col-lg-3">
														<input
															className="form-control"
															type="text"
															value={userInfo.state}
															placeholder="State"
														/>
													</div>
												</div>

												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														Password
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															type="password"
															value="11111122333"
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label form-control-label">
														Confirm password
													</label>
													<div className="col-lg-9">
														<input
															className="form-control"
															type="password"
															value="11111122333"
														/>
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
															type="button"
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
