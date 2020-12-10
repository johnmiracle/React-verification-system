/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import QrScan from 'react-qr-reader';
import { verify } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';

function QRscanner(props) {
	const productVerify = useSelector((state) => state.productVerify);
	const [facingMode, setFacingMode] = useState('');
	const { loading, success: successfulVerify, error } = productVerify;

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
				<div className="container">
					<div className="row">
						<div className="col-md-6 mt-4">
							<Link to="/product_verify">
								<Fab style={{ marginRight: 10 }} color="primary">
									<ArrowBack />
								</Fab>
							</Link>
						</div>
						<div className="col-md-6 mt-4">
							<center>
								<button
									className="btn btn-primary"
									onClick={() =>
										setFacingMode(facingMode === 'environment' ? 'user' : 'environment')
									}
								>
									switch camera
								</button>
							</center>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-md-3"></div>
						<div className="col-md-6">
							<center>
								<span>QR Scanner</span>

								<div style={{ marginTop: 30, marginBottom: 40 }}>
									{
										<QrScan
											delay={300}
											facingMode={facingMode}
											onError={handleError}
											onScan={handleScan}
											style={{ height: 240, width: 320 }}
										/>
									}
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
