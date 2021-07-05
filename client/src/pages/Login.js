/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function Login(props) {
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const userSignin = useSelector((state) => state.userSignin);
	const { loading, error, userInfo } = userSignin;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(phone, password));
	};

	useEffect(() => {
		if (userInfo && userInfo.account === 'admin') {
			props.history.push('/admin_dashboard');
		}
		if (userInfo && userInfo.account === 'user') {
			props.history.push('/profile');
		}
		return () => {
			//
		};
	}, [userInfo, props.history]);
	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<img className="Image" src="/login-concept-illustration.jpg" alt="login"></img>
							</div>
							<div className="col-md-6">
								<div className="row">
									<div className="col-md-1"></div>
									<div className="col-md-10">
										<form className="log-blk" onSubmit={submitHandler}>
											<h2 className="text m-2">Login</h2>
											{error && <MessageBox variant="danger">{error}</MessageBox>}
											<div className="form-group">
												<label htmlFor="exampleInputNumber">Phone Number</label>
												<input
													type="number"
													className="form-control"
													id="exampleInputNumber"
													onChange={(e) => setPhone(e.target.value)}
													placeholder="Enter Phone Number"
													required
												/>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">Password</label>
												<input
													type="password"
													className="form-control"
													id="exampleInputPassword1"
													onChange={(e) => setPassword(e.target.value)}
													placeholder="Password"
													required
												/>
											</div>
											<button type="submit" className="btn btn-success btn-block">
												SIGN IN
											</button>
											<center className="mt-5 mb-2">
												<Link to="/forgot-password" className="log-ml ml-r">
													Forgotten Password
												</Link>
											</center>
											<center className="log-top">
												Dont have an account? <Link to="/register">Sign Up</Link>
											</center>
										</form>
									</div>
									<div className="col-md-1"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
