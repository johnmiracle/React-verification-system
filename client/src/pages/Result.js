/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_FARM_SAVE_DETAIL_RESET, PRODUCT_VERIFY_RESET } from '../constants/productConstants';

function Result(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const productVerify = useSelector((state) => state.productVerify);
	const { verified } = productVerify;
	const dispatch = useDispatch();

	let redirect = '/my_farms';

	const resetHandler = (e) => {
		e.preventDefault();
		dispatch({ type: PRODUCT_VERIFY_RESET });
		dispatch({ type: PRODUCT_FARM_SAVE_DETAIL_RESET });
		props.history.push(redirect);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<div className="container">
						<div id="myModal" className="">
							<div className="modal-dialog modal-confirm">
								<div className="modal-content">
									<div className="modal-header-true">
										<div className="icon-box">
											<center>
												<i className="font-circle fa fa-check"></i>
											</center>
										</div>
									</div>
									<div className="modal-body text-center">
										<h4 className="">PRODUCT IS GENUINE</h4>
										<p className="model-text">
											Hello {userInfo.firstName} <br />
											<div className="">
												<center>
													You have been rewarded
													<br />
													<h5 className="pt-1">{verified.points} Points </h5>
													towards a free <br /> Farm and Health Insurance
												</center>
											</div>
											<button
												className="btn btn-success"
												data-dismiss="modal"
												onClick={resetHandler}
												type="submit"
											>
												PROCEED
											</button>
										</p>
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

export default Result;
