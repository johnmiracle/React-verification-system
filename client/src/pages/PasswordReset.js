/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { passwordreset } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { USER_PASSWORD_RESET } from '../constants/userConstants';

function PasswordReset(props) {
	const [phone, setPhone] = useState('');
	const userPasswordReset = useSelector((state) => state.userPasswordReset);
	const { loading, error, passwordReset } = userPasswordReset;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(passwordreset(phone));
	};

	useEffect(() => {
		if (passwordReset) {
			let requestId = passwordReset.verifyRequestId;
			props.history.push({ pathname: '/reset_code_verify', state: { phone, requestId } });
			dispatch({ type: USER_PASSWORD_RESET });
		}
		return () => {
			//
		};
	}, [dispatch, passwordReset, props.history, phone]);
	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="">
					<div className="container">
						<div className="row">
							<div className="col-md-3"></div>
							<div className="col-md-6">
								<form className="log-blk" onSubmit={submitHandler}>
									<img src="" alt="" />
									<h2 className="text m-2">Forgotten Password</h2>
									<p className="center">You can reset your password here</p>
									{error && <MessageBox variant="danger">{error}</MessageBox>}
									<div className="form-group mt-3">
											<input type="number" className="form-control" id="exampleInputPhone"
												onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" required />
									</div>

									<button type="submit" className="btn btn-success btn-block">
										Verify
									</button>
									<p className="text-center mt-4">
										Have an account? <Link to="/">Log in</Link>
									</p>
								</form>
							</div>
							<div className="col-md-3"></div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PasswordReset;
