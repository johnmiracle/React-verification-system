/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function Register(props) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();
	const redirect = '/';

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(firstName, lastName, phone, password));
	};

	useEffect(() => {
		if (userInfo) {
			setTimeout(() => {
				props.history.push(redirect);
			},4000);
		}
		return () => {
			//
		};
	}, [userInfo, props.history]);

	return (
		<div className="container">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="row mt-5">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<div className="container card ">
							<article className="card-body ">
								<div>
									{error && <MessageBox variant="danger">{error}</MessageBox>}
									{userInfo && (
										<MessageBox variant="success">
											Registration is successfull, Please Login
										</MessageBox>
									)}
									<h4 className="card-title mt-3 text-center">Create Account</h4>
									<p className="text-center">Get started with your free account</p>
									<form onSubmit={submitHandler}>
										<div className="form-group input-group" id="name">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-user"></i>
												</span>
											</div>
											<input
												name=""
												className="form-control"
												placeholder="First Name"
												type="text"
												onChange={(e) => setFirstName(e.target.value)}
												required={true}
											/>
										</div>
										<div className="form-group input-group" id="name">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-user"></i>
												</span>
											</div>
											<input
												name=""
												className="form-control"
												placeholder="Last Name"
												type="text"
												onChange={(e) => setLastName(e.target.value)}
												required={true}
											/>
										</div>
										<div className="form-group input-group" id="mobileNumber">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-phone"></i>
												</span>
											</div>
											<input
												name=""
												className="form-control"
												placeholder="Phone number"
												type="text"
												onChange={(e) => setPhone(e.target.value)}
												required={true}
											/>
										</div>
										<div className="form-group input-group" id="password">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-lock"></i>
												</span>
											</div>
											<input
												className="form-control"
												placeholder="Create password"
												type="password"
												onChange={(e) => setPassword(e.target.value)}
												required={true}
											/>
										</div>
										<div className="form-group">
											<button
												type="submit"
												className="btn btn-primary btn-block"
												onClick={submitHandler}
											>
												Create Account
											</button>
										</div>
										<p className="text-center">
											Have an account?
											<Link to="/">Log in</Link>
										</p>
									</form>
								</div>
							</article>
						</div>
					</div>
					<div className="col-md-3"></div>
				</div>
			)}
		</div>
	);
}

export default Register;
