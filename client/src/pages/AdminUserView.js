/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listUsers } from '../actions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function AdminUserView(props) {
	const adminUserList = useSelector((state) => state.adminUserList);
	const { loading, error, users } = adminUserList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listUsers());
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
					<h4 className="">User List</h4>
					<div className="table-responsive">
						{users.length > 0 ? (
							<table className="table table-hover ">
								<thead>
									<tr>
										<th>User ID</th>
										<th>First Name</th>
										<th>Last Number</th>
										<th>Point</th>
										<th>Activites</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<tr key={user._id}>
											<td>0{user.phone}</td>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.points}</td>
											<td>
												<Link to={'/user/' + user._id}>View user</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="center">User List Empty</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminUserView;
