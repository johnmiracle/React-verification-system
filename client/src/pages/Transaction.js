/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listHistoryMine } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function Transaction(props) {
	const userHistory = useSelector((state) => state.userHistory);
	const { histories, loading, error } = userHistory;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listHistoryMine());
		return () => {
			//
		};
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="container mt-5">
					<Link to="/product_verify" className="btn btn-primary btn-sm">
						Back
					</Link>
					<h4 className="mt-3">Transaction</h4>
					<div className="table-responsive">
						{histories.length > 0 ? (
							<table className="table table-hover">
								<thead>
									<tr>
										<th className="th-lg">Phone Number</th>
										<th className="th-lg">Product Name</th>
										<th className="th-lg">Pin Code</th>
										<th className="th-lg">Batch No</th>
										<th className="th-lg">Serial Number</th>
										<th className="th-lg">Point</th>
									</tr>
								</thead>
								<tbody>
									{histories.map((history) => (
										<tr key={history._id}>
											<td>0{history.user.phone}</td>
											<td>{history.product}</td>
											<td>{history.pin_code}</td>
											<td>{history.batch_no}</td>
											<td>{history.serial}</td>
											<td>{history.point}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="center">Transaction Empty</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Transaction;
