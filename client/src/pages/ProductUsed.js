/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsedProducts } from '../actions/adminActions';
import { CSVLink } from 'react-csv';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductUsed() {
	const adminProductUsedList = useSelector((state) => state.adminProductUsedList);
	const { loading, error, products } = adminProductUsedList;

	const headers = [
		{ label: 'Product Name', key: 'product' },
		{ label: 'Serial Number', key: 'serial' },
		{ label: 'Batch No', key: 'batch_no' },
		{ label: 'Pin Code', key: 'pin_code' },
		{ label: 'User ID', key: `${product.user.phone}` },
		{ label: 'Date', key: "Date" }
	];

	const csvReport = {
		data: products,
		headers: headers,
		filename: 'Used-Products.csv'
	};

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
					<div className="row">
						<div className="col-ml-6 pb-4 pt-4">
							<h2 className="">Products</h2>
						</div>
						<div className="col-ml-6 ml-auto">
							{products.length > 0 ? (
								<CSVLink {...csvReport} className="btn btn-primary btn-sm">
									Download CSV
								</CSVLink>
							) : (
								<div className="btn btn-danger btn-sm">Unavailable</div>
							)}
						</div>
					</div>
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
											<td>{product.product}</td>
											<td>{product.serial}</td>
											<td>{product.batch}</td>
											<td>{product.pin_code}</td>
											<td>{product.point}</td>
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
			)}
		</div>
	);
}

export default ProductUsed;
