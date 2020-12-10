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
	const { loading, userInfo, error } = userSignin;
	const dispatch = useDispatch();

	const redirect = '/product_verify';

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(phone, password));
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
		return () => {
			//
		};
	}, [userInfo, props.history]);
	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="container mt-5 mb-5">
					<div className="row">
						<div className="col-md-3"></div>
						<div className="col-md-6">
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
								<button
									type="submit"
									onClick={submitHandler}
									className="btn btn-primary btn-block"
								>
									SIGN IN
								</button>
								<center className="mt-5 mb-2">
									<Link to="#" className="log-ml ml-r">
										Forgotten Password
									</Link>
								</center>
								<center className="log-top">
									Dont have an account? <Link to="/register">Sign Up</Link>
								</center>
							</form>
						</div>
						<div className="col-md-3"></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Login;
