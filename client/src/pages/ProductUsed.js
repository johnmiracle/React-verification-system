/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsedProducts } from '../actions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductUsed() {
	const adminProductUsedList = useSelector((state) => state.adminProductUsedList);
	const { loading, error, products } = adminProductUsedList;

	console.log(products);

	const dispatch = useDispatch();

	// Use Effect
	useEffect(() => {
		dispatch(listUsedProducts());
		return () => {
			//
		};
	}, [dispatch]);

	return (
		<div className="container">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox>{error}</MessageBox>
			) : (
				<div className="">
					<div className="pb-4 pt-4">
						<h2 className="">Products</h2>
					</div>
					<div className="row">
						<div className="col-ml-3"></div>
						<div className="col-ml-6">
							<div className="product-list mt-4">
								{products.length > 0 ? (
									<table className="table">
										<thead>
											<tr>
												<th>ID</th>
												<th>Product Name</th>
												<th>Serial No</th>
												<th>Batch No</th>
												<th>Pin Code</th>
												<th>Point</th>
												<th>User ID</th>
											</tr>
										</thead>
										<tbody>
											{products.map((product) => (
												<tr key={product._id}>
													<td>{product._id}</td>
													<td>{product.usedSerial_Product.Name}</td>
													<td>{product.usedSerial}</td>
													<td>{product.batch}</td>
													<td>{product.code}</td>
													<td>{product.points}</td>
													<td>0{product.user.phone}</td>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<center>
										<div className="center mt-5">Products Empty</div>
									</center>
								)}
							</div>
						</div>
						<div className="col-ml-3"></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductUsed;
