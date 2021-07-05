/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ResetPassword(props) {
	const phone = props.location.state;
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const userResetPassword = useSelector((state) => state.userResetPassword);
	const { loading, error, codeVerify } = userResetPassword;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (isValid) {
			dispatch(resetPassword(password, phone));
		}
	};

	const isValid = () => {
		if (password !== confirmPassword) {
			throw error.message;
		}
	};

	useEffect(() => {
		return () => {
			//
		};
	}, []);

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-1"></div>
								<div className="col-md-10">
									<div className="passcontainer mt-5">
										{error && <MessageBox variant="danger">{error}</MessageBox>}
										<h4 className="password-test">Reset your password</h4>
										<p className="password-para">Change your password</p>
										<form className="" onSubmit={submitHandler}>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">Password</label>
												<input
													type="password"
													className="form-control"
													id="exampleInputPassword"
													placeholder="New password"
													onChange={(e) => setPassword(e.target.value)}
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">Confirm Password</label>
												<input
													type="password"
													className="form-control"
													id="exampleInputConfirmPassword"
													placeholder="Confirm new password"
													onChange={(e) => setConfirmPassword(e.target.value)}
													required
												/>
											</div>
											<button type="submit" className="btn btn-success btn-block">
												Reset Password
											</button>
										</form>
									</div>
								</div>
								<div className="col-md-1"></div>
							</div>
						</div>
						<div className="col-md-6">
							<img src="/forgot-password-login-illustration.jpg" alt="resetpicture-illustration" className="Image" />
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ResetPassword;
