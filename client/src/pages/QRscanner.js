/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import QrScan from 'react-qr-reader';
import { verify } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';

function QRscanner(props) {
	const productVerify = useSelector((state) => state.productVerify);
	const { loading, success: successfulVerify, error } = productVerify;

	const cameraButton = (facingMode) => {
		if (facingMode === 'environment') {
			this.setState({
				facingMode: 'user'
			});
		} else {
			this.setState({
				facingMode: 'environment'
			});
		}
	};

	const dispatch = useDispatch();
	const handleScan = (code) => {
		if (code) {
			dispatch(verify(code));
		}
	};
	const handleError = (err) => {
		console.error(err);
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
		<div className="container">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="">
					<div className="mt-4">
						<Link to="/product_verify">
							<Fab style={{ marginRight: 10 }} color="primary">
								<ArrowBack />
							</Fab>
						</Link>
					</div>
					<div className="row">
						<div className="col-md-3"></div>
						<div className="col-md-6">
							<center>
								<span>QR Scanner</span>
								<div style={{ marginTop: 30 }}>
									<QrScan
										delay={300}
										facingMode="user"
										onError={handleError}
										onScan={handleScan}
										style={{ height: 240, width: 320 }}
									/>
								</div>
							</center>
						</div>
						<div className="col-md-3"></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default QRscanner;
