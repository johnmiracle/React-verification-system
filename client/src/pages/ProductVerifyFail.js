/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_VERIFY_RESET } from '../constants/productConstants';

function ProductVerifyFail(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const productVerify = useSelector((state) => state.productVerify);
	const { error } = productVerify;
	const dispatch = useDispatch();

	let redirect = '/product_verify';

	const resetHandler = (e) => {
		e.preventDefault();
		dispatch({ type: PRODUCT_VERIFY_RESET });
		props.history.push(redirect);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ type: PRODUCT_VERIFY_RESET });
			props.history.push(redirect);
		}, 17000);
		return () => clearTimeout(timer);
	}, [props.history, dispatch, redirect]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<div className="container">
						<div id="myModal" className="">
							<div className="modal-dialog modal-confirm">
								<div className="modal-content">
									<div className="modal-header-false">
										<div className="icon-box">
											<center>
												<i className="font-circle fa fa-times p-4"></i>
												<h3 className="pt-3">Bad!!!</h3>
											</center>
										</div>
									</div>
									<div className="modal-body text-center">
										<h4>Bad!!!</h4>
										<p className="model-text">
											Hello {userInfo.firstName} <br />
											{error}
										</p>
										<a href="tel:08131179082" className="btn btn-danger">
											<span>
												<i className="fa fa-phone fa-flip-horizontal pl-2"></i>
											</span>
											Report Now
										</a>
										<br />
										<i className="btn" onClick={resetHandler}>
											Continue
										</i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
}

export default ProductVerifyFail;
