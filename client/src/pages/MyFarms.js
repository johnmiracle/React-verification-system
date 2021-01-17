/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listAllFarms } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function MyFarms(props) {
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
			<div className="container">
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div className="mt-5">
						<div className="row pt-4">
							<div className="col-ml-6">
								<h4 className="">My Farms</h4>
							</div>
							<div className="col-ml-6 ml-auto">
								<Link to="/new_farm" className="btn btn-primary btn-sm">
									Start A New farm
								</Link>
							</div>
						</div>

						<div className="product-list mt-4 mb-5 table-responsive">
							{farms.length > 0 ? (
								<table className="table text-nowrap">
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
										{farms.map((farm) => (
											<tr key={farm._id}>
												<td>
													{Math.round(
														(farm.accured_points * 100) / farm.expected_points ||
															0
													)}
													%
												</td>
												<td>{farm.farm_name}</td>
												<td>{farm.farm_size}</td>
												<td>{farm.farm_capacity}</td>
												<td>
													<Link to={'/add_package/' + farm._id}>Edit farm</Link>
												</td>
												<td>
													<Link to={'/farm_package/' + farm._id}>View farm</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<div className="center mt-5">Farm List is Empty, Start a New Farm.</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default MyFarms;
