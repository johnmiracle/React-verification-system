/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { passwordreset, passwordverifycode } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function PasswordCodeVerify(props) {
	const { phone, requestId } = props.location.state;
	const [code, setCode1] = useState('');
	const [code2, setCode2] = useState('');
	const [code3, setCode3] = useState('');
	const [code4, setCode4] = useState('');

	const codeNum = code + code2 + code3 + code4;

	const userCodeVerify = useSelector((state) => state.userCodeVerify);
	const { loading, error, codeVerify } = userCodeVerify;
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(passwordverifycode(codeNum, requestId));
	};

	const resendCodeHandler = (e) => {
		e.preventDefault();
		dispatch(passwordreset(phone));
	};

	useEffect(() => {
		if (codeVerify) {
			props.history.push({ pathname: '/reset-password', state: { phone } });
		}
		return () => {
			//
		};
	}, [codeVerify, props.history, phone]);
	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<div className="">
					<div className="container">
						<div className="row">
							<div className="col-md-2"></div>
							<div className="col-md-8">
								<div id="wrapper" className="mt-5 mb-5">
									<div id="dialog">
										<h5>Please enter the 6-digit verification code we sent via SMS:</h5>
										<span>(we want to make sure it's you before we contact our movers)</span>
										{error && <MessageBox variant="danger">{error}</MessageBox>}
										<form className="" id="form" onSubmit={submitHandler}>
											<input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={(e) => setCode1(e.target.value)} required />
											<input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={(e) => setCode2(e.target.value)} required />
											<input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={(e) => setCode3(e.target.value)} required />
											<input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" onChange={(e) => setCode4(e.target.value)} required />

											<button type="submit" className="btn btn-primary btn-block btn-submit">
												Verify
											</button>
										</form>

										<div>
											<span>Didn't receive the code?</span>
											<br />
											<Link>
												<small onClick={resendCodeHandler}>Send code again</small>
											</Link>
											<br />
											<Link to="/forgot-password">
												<small>Change phone number</small>
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-2"></div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PasswordCodeVerify;
