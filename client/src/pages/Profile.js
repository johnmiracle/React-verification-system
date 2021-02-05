/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detail, listAllFarms, update, upload, userLog } from '../actions/userActions';
import 'react-circular-progressbar/dist/styles.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function Profile(props) {
	const [open, setOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [cluster, setCluster] = useState('');

	const handleClickOpen = (userDatas) => {
		setOpen(true);
		console.log(userDatas.firstName);
		setFirstName(userDatas.firstName);
		setLastName(userDatas.lastName);
		setPhone(userDatas.phone);
		setAddress(userDatas.address);
		setState(userDatas.state);
		setCity(userDatas.city);
		setCluster(userDatas.cluster);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const userAllFarms = useSelector((state) => state.userAllFarms);
	const { loading, farms, error } = userAllFarms;

	const userLogs = useSelector((state) => state.userLogs);
	const { loading: logsLoading, error: logsError, logs } = userLogs;

	const userDetail = useSelector((state) => state.userDetail);
	const { loading: detailLoading, userDatas } = userDetail;

	const userProfileImage = useSelector((state) => state.userProfileImage);
	const { loading: ImgLoading, userImg, error: uploadError } = userProfileImage;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(update({ userId: userInfo._id, firstName, lastName, phone, address, state, city, cluster }));
	};

	const uploadHandler = (e) => {
		const file = e.target.files[0];
		const userImg = new FormData();
		userImg.append('file', file);
		dispatch(upload(userImg));
	};

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, success: updateSuccessful, error: UpdateError } = userUpdate;

	const dispatch = useDispatch();
	useEffect(() => {
		if (userImg) {
			//
		}
		if (updateSuccessful) {
			setOpen(false);
			setTimeout(() => {
				dispatch({ type: USER_UPDATE_RESET });
			}, 5000);
		}
		dispatch(userLog());
		dispatch(listAllFarms());
		dispatch(detail());
		return () => {
			//
		};
	}, [dispatch, userImg, updateSuccessful]);

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="profile-box mb-5 ">
					<div className="container ">
						{updateSuccessful && (
							<MessageBox variant="success">Profile Updated Successfully.</MessageBox>
						)}
						{UpdateError && (
							<div>
								<MessageBox variant="danger">{error}</MessageBox>
							</div>
						)}
						<div className="container-fluid">
							{uploadError && <MessageBox variant="danger">{uploadError}</MessageBox>}
							<div className="row my-2">
								<div className="col-lg-4 order-lg-1 text-center">
									{detailLoading ? (
										<LoadingBox></LoadingBox>
									) : (
										<>
											{ImgLoading ? (
												<LoadingBox></LoadingBox>
											) : (
												<img
													src={userDatas.image || '//placehold.it/150'}
													className="mx-auto img-fluid img-circle d-block image-size"
													alt="avatar"
												/>
											)}
										</>
									)}
									<h6 className="mt-2">Upload a different photo</h6>
									<label className="custom-file">
										<input
											type="file"
											id="file"
											name="file"
											className="custom-file-input"
											onChange={uploadHandler}
										/>
										<span className="custom-file-control btn btn-sm">Choose file</span>
										<br />
										<small> Image Size should not be above 2MB </small>
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
												data-target="#my-farms"
												data-toggle="tab"
												className="nav-link"
											>
												My Farms
											</Link>
										</li>
									</ul>
									<div className="tab-content py-4">
										<div className="tab-pane active" id="profile">
											<div className="row pt-1 pb-3">
												<div className="col-6">
													<h5 className="mb-3">User Profile</h5>
												</div>
												<div className="col-6">
													<Button
														variant="outlined"
														color="success"
														className=""
														onClick={() => handleClickOpen(userDatas)}
													>
														Edit Profile
													</Button>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="row">
														{detailLoading ? (
															<LoadingBox></LoadingBox>
														) : (
															<>
																<div className="col-md-4">
																	<h6>
																		<b>Name: </b>
																	</h6>
																	<p>
																		{userDatas.firstName}{' '}
																		{userDatas.lastName}
																	</p>
																	<h6>
																		<b>Phone: </b>
																	</h6>
																	<p>0{userDatas.phone}</p>
																</div>
																<div className="col-md-4">
																	<h6>
																		<b>Location: </b>
																	</h6>
																	<p className="mt-2">
																		State:{' '}
																		{userDatas.state || ' Not Filled Yet'}
																	</p>
																	<p className="mt-2">
																		City:{' '}
																		{userDatas.city || ' Not Filled Yet'}
																	</p>
																</div>
																<div className="col-md-4">
																	<h6 className="mr-auto">
																		<b>Cluster: </b>
																	</h6>
																	<p>
																		{userDatas.cluster ||
																			' Not Filled Yet'}
																	</p>
																</div>
															</>
														)}
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
																		<p className="center">
																			No Activities done
																		</p>
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
														200 Points
													</span>
												</h6>

												<h6 className="mt-3">
													{detailLoading ? (
														<>
															Total Points:{' '}
															<span class="float-right font-weight-bold">
																0 Points
															</span>
														</>
													) : (
														<>
															Total Points:{' '}
															<span class="float-right font-weight-bold">
																{userDatas.points || 0} Points
															</span>
														</>
													)}
												</h6>

												<h6 className="mt-4">
													{detailLoading ? (
														<LoadingBox></LoadingBox>
													) : (
														<>
															FarmSured Benefits Status:
															{userDatas.points >= 200 ? (
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
										<div className="tab-pane" id="my-farms">
											<div className="row pt-1">
												<div className="col-ml-6">
													<h4 className="">My Farms</h4>
												</div>
												<div className="col-ml-6 ml-auto">
													<Link to="/new_farm" className="btn btn-primary btn-sm">
														Start A New farm
													</Link>
												</div>
											</div>
											<div className="table-responsive">
												{farms.length > 0 ? (
													<table class="table table-hover table-striped">
														<thead>
															<tr>
																<th>Points</th>
																<th>Farm Name </th>
																<th>Farm Size </th>
																<th>Farm Capacity</th>
																<th>Edit Farm</th>
																<th>View Farm</th>
															</tr>
														</thead>
														<tbody>
															<>
																{farms.map((farm) => (
																	<tr key={farm._id}>
																		<td>
																			{Math.round(
																				(farm.accured_points * 100) /
																					farm.expected_points || 0
																			)}
																			%
																		</td>
																		<td>{farm.farm_name}</td>
																		<td>{farm.farm_size}</td>
																		<td>{farm.farm_capacity}</td>
																		<td>
																			<Link
																				to={
																					'/add_package/' + farm._id
																				}
																			>
																				Edit farm
																			</Link>
																		</td>
																		<td>
																			<Link
																				to={
																					'/farm_package/' +
																					farm._id
																				}
																			>
																				View farm
																			</Link>
																		</td>
																	</tr>
																))}
															</>
														</tbody>
													</table>
												) : (
													<p className="mt-4 center">No Farm Created</p>
												)}
											</div>
										</div>
										<div className="tab-pane">
											<Dialog
												open={open}
												onClose={handleClose}
												aria-labelledby="form-dialog-title"
											>
												{loadingUpdate ? (
													<LoadingBox></LoadingBox>
												) : (
													<>
														<DialogTitle id="form-dialog-title">
															Edit Profile
														</DialogTitle>
														<DialogContent>
															<form onSubmit={submitHandler}>
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
																			onChange={(e) =>
																				setFirstName(e.target.value)
																			}
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
																			onChange={(e) =>
																				setLastName(e.target.value)
																			}
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
																			onChange={(e) =>
																				setPhone(e.target.value)
																			}
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
																			onChange={(e) =>
																				setAddress(e.target.value)
																			}
																		/>
																	</div>
																</div>
																<div className="form-group row">
																	<label className="col-lg-3 col-form-label form-control-label"></label>
																	<div className="col-lg-5 mt-2">
																		<input
																			className="form-control"
																			type="text"
																			value={state}
																			placeholder="State"
																			onChange={(e) =>
																				setState(e.target.value)
																			}
																		/>
																	</div>
																	<div className="col-lg-4 mt-2">
																		<input
																			className="form-control"
																			type="text"
																			value={city}
																			placeholder="City"
																			onChange={(e) =>
																				setCity(e.target.value)
																			}
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
																			onChange={(e) =>
																				setCluster(e.target.value)
																			}
																		></input>
																	</div>
																</div>

																<DialogActions>
																	<Button
																		onClick={handleClose}
																		color="primary"
																	>
																		Cancel
																	</Button>
																	<Button type="submit" color="primary">
																		Update
																	</Button>
																</DialogActions>
															</form>
														</DialogContent>
													</>
												)}
											</Dialog>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Profile;
