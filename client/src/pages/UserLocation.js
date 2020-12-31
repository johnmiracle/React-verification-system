/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { location } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function UserLocation(props) {
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [cluster, setCluster] = useState('');
	const userLocation = useSelector((state) => state.userLocation);
	const { loading, userLocationInfo, success: successLocation, error } = userLocation;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(location(state, city, cluster));
	};

	useEffect(() => {
		if (successLocation) {
			setTimeout(() => {
				props.history.push('/my_farms');
			}, 3000);
		}
		return () => {
			//
		};
	}, [successLocation, props.history]);

	return (
		<div className="container">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="mt-5 h-100">
					<div className="row">
						<div className="col-md-3"></div>
						<div className="col-md-6">
							<div className="container card ">
								<article className="card-body ">
									<div>
										{error && <MessageBox variant="danger">{error}</MessageBox>}
										{successLocation && (
											<MessageBox variant="success">
												{userLocationInfo.message}
											</MessageBox>
										)}
										<center>
											<i className="fa fa-map-marker"></i>
										</center>
										<h4 className="card-title mt-3 text-center">Location</h4>
										<form onSubmit={submitHandler}>
											<div className="form-group input-group" id="name">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<i className="fa fa-location"></i>
													</span>
												</div>
												<input
													name=""
													className="form-control"
													placeholder="State"
													type="text"
													onChange={(e) => setState(e.target.value)}
													required={true}
												/>
											</div>
											<div className="form-group input-group" id="name">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<i className="fa fa-location"></i>
													</span>
												</div>
												<input
													name=""
													className="form-control"
													placeholder="City"
													type="text"
													onChange={(e) => setCity(e.target.value)}
													required={true}
												/>
											</div>
											<div className="form-group input-group" id="password">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<i className="fa fa-users"></i>
													</span>
												</div>
												<input
													className="form-control"
													placeholder="Cluster you belong to?"
													type="text"
													onChange={(e) => setCluster(e.target.value)}
													required={true}
												/>
											</div>
											<div className="form-group">
												<button
													type="submit"
													className="btn btn-primary btn-block"
													onClick={submitHandler}
												>
													Submit
												</button>
											</div>
										</form>
									</div>
								</article>
							</div>
						</div>
						<div className="col-md-3"></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default UserLocation;
