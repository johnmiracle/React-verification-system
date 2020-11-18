/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../actions/productActions';
import { Fab } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';

function CodeVerify(props) {
	const [code, setCode] = useState('');
	const productVerify = useSelector((state) => state.productVerify);
	const { loading, success: successfulVerify, error } = productVerify;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(verify(code));
	};
	useEffect(() => {
		if (successfulVerify) {
			let redirect = '/result';
			props.history.push(redirect);
		}
		if (error) {
			let redirect = '/result_fail';
			props.history.push(redirect);
		}
		return () => {
			//
		};
	}, [successfulVerify, error, props.history]);
	return (
		<div>
			<div className="container mt-5">
				{loading ? (
					<LoadingBox></LoadingBox>
				) : (
					<div>
						<div className="mt-4">
							<Link to="/product_verify">
								<Fab style={{ marginRight: 10 }} color="primary">
									<ArrowBack />
								</Fab>
							</Link>
						</div>
						<div className="row mt-3">
							<div className="col-md-3"></div>
							<div className="col-md-6">
								<form onSubmit={submitHandler}>
									<div className="md-form">
										<input
											type="text"
											id="form1"
											className="form-control"
											id="exampleInputNumber"
											onChange={(e) => setCode(e.target.value)}
											required
										/>
										<label for="form1">Product Code</label>
									</div>
									<button
										onSubmit={submitHandler}
										type="submit"
										className="btn btn-block btn-primary"
									>
										Verify
									</button>
								</form>
							</div>
							<div className="col-md-3"></div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default CodeVerify;
