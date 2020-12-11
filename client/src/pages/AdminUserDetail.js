/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userDetails } from '../actions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function AdminUserDetail(props) {
	const adminUserDetails = useSelector((state) => state.adminUserDetails);
	const { loading, error, histories } = adminUserDetails;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userDetails(props.match.params.id));
		return () => {
			//
		};
	}, [dispatch, props.match]);
	return (
		<div className="container">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="">
					<div className="mt-4 mb-4">
						<Link className="btn btn-primary btn-sm" to="/users">
							Back
						</Link>
					</div>
					<div className="mb-4 mt-4">
						<h4>User Activites</h4>
					</div>
					<div className="table-responsive">
						{histories.length > 0 ? (
							<table className="table table-hover">
								<thead>
									<tr>
										<th>User ID</th>
										<th>Product Name</th>
										<th>Product Batch</th>
										<th>Pin Code</th>
										<th>Point</th>
									</tr>
								</thead>
								<tbody>
									{histories.map((history) => (
										<tr key={history._id}>
											<td>0{history.user.phone}</td>
											<td>{history.product}</td>
											<td>{history.batch_no}</td>
											<td>{history.pin_code}</td>
											<td>{history.point}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="">No Activites</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminUserDetail;
