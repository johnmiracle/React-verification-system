/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listHistoryMine } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function Transaction(props) {
	const userHistory = useSelector((state) => state.userHistory);
	const { loading, error, histories } = userHistory;

	console.log(histories);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listHistoryMine());
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="container mt-5">
					<h4 className="">Transaction</h4>
					<div className="table-responsive">
						{histories.length > 0 ? (
							<table className="table table-hover table-fixed w-auto">
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
										<tr>
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
