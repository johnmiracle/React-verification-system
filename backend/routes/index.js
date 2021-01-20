/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import passport from '../config/passport.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getToken, isUser, isAuth } from '../config.js';
import Userlog from '../models/Userlog.js';

const indexRouter = express.Router();

indexRouter.post(
	'/login',
	expressAsyncHandler(function (req, res, next) {
		passport.authenticate('local', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user.password) {
				return res.status(404).send({ message: 'Invalided User ID or Password!!!' });
			}
			if (!user) {
				return res.status(404).send({
					message:
						"User ID & Password combination doesn't match any of our records, Kindly register!!!"
				});
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				} else {
					return res.send({
						_id: user.id,
						phone: user.phone,
						firstName: user.firstName,
						lastName: user.lastName,
						state: user.state,
						account: user.account,
						points: user.points,
						address: user.address,
						city: user.city,
						cluster: user.cluster,
						token: getToken(user)
					});
				}
			});
		})(req, res, next);
	})
);

indexRouter.post(
	'/register',
	expressAsyncHandler(async function (req, res, next) {
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const phone = req.body.phone;
		const password = req.body.password;

		let user = await User.findOne({ phone: req.body.phone });
		if (user) {
			res.status(404).send({
				message: 'Phone Number is already registered, Please login'
			});
		} else {
			const newUser = new User({
				firstName,
				lastName,
				phone,
				password
			});

			bcrypt.hash(newUser.password, 10, (err, hash) => {
				newUser.password = hash;
				newUser.save(function (err) {
					if (err) {
						console.log(err);
					} else {
						const userActivity = new Userlog({
							user: newUser,
							createdAt: new Date(),
							activity: 'User Subscribed'
						});
						userActivity.save();

						res.status(200).send({
							_id: newUser.id,
							phone: newUser.phone,
							firstName: newUser.firstName,
							lastName: newUser.lastName,
							account: newUser.account,
							points: newUser.points,
							token: getToken(newUser)
						});
					}
				});
			});
		}
	})
);

indexRouter.post(
	'/location',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const state = req.body.state;
		const city = req.body.city;
		const cluster = req.body.cluster;

		// Update User Location
		await User.updateOne({ _id: req.user }, { $set: { state: state, city: city, cluster: cluster } })
			.then(res.status(200).send({ message: 'Location Added Successful' }))
			.catch((err) => {
				console.log(err);
				res.status(404).send({ message: 'Error saving your Location' });
			});
	})
);

export default indexRouter;
