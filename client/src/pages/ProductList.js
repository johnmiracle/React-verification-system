/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/adminActions';
import { CSVLink } from 'react-csv';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function ProductList(props) {
	const adminProductList = useSelector((state) => state.adminProductList);
	const { loading, products, error } = adminProductList;

	const headers = [
		{ label: 'Product Name', key: 'product' },
		{ label: 'Serial Number', key: 'serial' },
		{ label: 'Batch No', key: 'batch_no' },
		{ label: 'Pin Code', key: 'pin_code' },
		{ label: 'Barcode', key: 'barcode' },
		{ label: 'QR Code', key: 'QRcode' }
	];

	const csvReport = {
		data: products,
		headers: headers,
		filename: 'Products.csv'
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts());
		return () => {
			//
		};
	}, [dispatch]);

	return (
		<div className="container">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="mt-5">
					<div className="row">
						<div className="col-ml-6 pb-4">
							<h4 className="">Products</h4>
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

					<div className="product-list mt-4 mb-5 table-responsive">
						{products.length > 0 ? (
							<table className="table text-nowrap">
								<thead>
									<tr>
										<th>ID</th>
										<th>Product Name</th>
										<th>Serial No</th>
										<th>Batch No</th>
										<th>Pin Code</th>
										<th>Point</th>
										<th>Barcode</th>
										<th>QRcode</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product) => (
										<tr key={product._id}>
											<td>{product._id}</td>
											<td>{product.product}</td>
											<td>{product.serial}</td>
											<td>{product.batch_no}</td>
											<td>{product.pin_code}</td>
											<td>{product.points}</td>
											<td>
												<a
													className="btn btn-primary btn-sm"
													href={product.barcode}
													download
												>
													Barcode
												</a>
											</td>
											<td>
												<a
													className="btn btn-primary btn-sm"
													href={product.QRcode}
													download
												>
													QR Code
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="center mt-5">Products Empty</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductList;
