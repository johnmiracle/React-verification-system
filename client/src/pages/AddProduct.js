/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../actions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_ADD_RESET } from '../constants/adminConstants';

function AddProduct() {
	const [productName, setProductName] = useState('');
	const [batchNumber, setBatchNumber] = useState('');
	const [serialNumber, setSerialNumber] = useState('');
	const [point, setPoint] = useState(10);
	const [numberOfProducts, setNumberOfProducts] = useState('');

	const adminAddProduct = useSelector((state) => state.adminAddProduct);
	const { loading, success: successSave, error } = adminAddProduct;

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (
			(productName === '' || productName === null,
			batchNumber === '' || batchNumber === null,
			serialNumber === '' || serialNumber === null)
		) {
			alert('All field must be filled');
			return false;
		}
		dispatch(addProduct(productName, batchNumber, serialNumber, point, numberOfProducts));
	};

	useEffect(() => {
		if (successSave) {
			const timer = setTimeout(() => {
				dispatch({ type: PRODUCT_ADD_RESET });
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [dispatch, successSave]);

	return (
		<div className="container">
			<div className="row mt-5 h-100">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					{loading ? (
						<LoadingBox></LoadingBox>
					) : error ? (
						<MessageBox variant="danger">{error}</MessageBox>
					) : (
						<div>
							{successSave && <MessageBox>Product Created Successfully</MessageBox>}
							<div className="card">
								<h5 className="card-header info-color white-text text-center py-4">
									<strong>Product Unique Pin Generator</strong>
								</h5>
								<div className="card-body px-lg-5 pt-0">
									<form className="text-center" onSubmit={submitHandler}>
										<div className="md-form">
											<input
												type="text"
												id="materialLoginFormText"
												className="form-control"
												onChange={(e) => setProductName(e.target.value)}
												required
											/>
											<label htmlFor="materialLoginFormText">Product Name</label>
										</div>
										<div className="md-form">
											<input
												type="number"
												id="materialLoginFormNumber"
												className="form-control"
												onChange={(e) => setBatchNumber(e.target.value)}
												required
											/>
											<label htmlFor="materialLoginFormNumber">Batch Number</label>
										</div>
										<div className="md-form">
											<input
												type="number"
												id="materialLoginFormNumber"
												className="form-control"
												onChange={(e) => setSerialNumber(e.target.value)}
												required
											/>
											<label htmlFor="materialLoginFormNumber">Serial Number</label>
										</div>
										<div className="md-form">
											<input
												type="number"
												id="materialLoginFormNumber"
												className="form-control"
												onChange={(e) => setPoint(e.target.value)}
												required
											/>
											<label htmlFor="materialLoginFormNumber">Point</label>
										</div>
										<div className="md-form">
											<input
												type="number"
												id="materialLoginFormNumber"
												className="form-control"
												onChange={(e) => setNumberOfProducts(e.target.value)}
												required
											/>
											<label htmlFor="materialLoginFormNumber">Number of Products</label>
										</div>
										<button
											className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
											type="submit"
											onClick={submitHandler}
										>
											Generate
										</button>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
}
export default AddProduct;
