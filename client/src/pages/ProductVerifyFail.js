/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_FARM_SAVE_DETAIL_RESET, PRODUCT_VERIFY_RESET } from '../constants/productConstants';

function ProductVerifyFail(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const productVerify = useSelector((state) => state.productVerify);
	const { error } = productVerify;
	const dispatch = useDispatch();

	let redirect = '/my_farms';

	const resetHandler = (e) => {
		e.preventDefault();
		dispatch({ type: PRODUCT_VERIFY_RESET });
		dispatch({ type: PRODUCT_FARM_SAVE_DETAIL_RESET });
		props.history.push(redirect);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ type: PRODUCT_VERIFY_RESET });
			dispatch({ type: PRODUCT_FARM_SAVE_DETAIL_RESET });
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
											</center>
										</div>
									</div>
									<div className="modal-body text-center">
										<h4 className="color">PRODUCT IS FAKE!</h4>
										<p className="model-text">
											Hello {userInfo.firstName} <br />
										</p>
										<h5>{error}</h5>
										<p>GET A REWARD BY REPORTING THIS</p>
										<a href="tel:+2349040000770" className="btn btn-danger">
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
