/** @format */

import jwt from 'jsonwebtoken';

const getToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			account: user.account,
			points: user.points,
			state: user.state,
			city: user.city,
			cluster: user.cluster
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '3h'
		}
	);
};

const isAuth = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		const onlyToken = token.slice(7, token.length);
		jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				return res.status(401).send({ message: 'Your session has expired, Kindly login again' });
			}
			req.user = decode;
			next();
			return;
		});
	} else {
		return res.status(401).send({ message: 'Token is not supplied.' });
	}
};

const isAdmin = (req, res, next) => {
	let userCheck = req.user.account === 'admin';
	if (req.user && userCheck) {
		return next();
	}
	return res.status(401).send({ message: 'Admin Token is not valid. Kindly contact your admin' });
};

const isUser = (req, res, next) => {
	let userCheck = req.user.account === 'user';
	if (req.user && userCheck) {
		return next();
	} else {
		res.status(401).send({
			message: 'You are not authorized to view this page'
		});
	}
};

export { getToken, isAuth, isAdmin, isUser };
