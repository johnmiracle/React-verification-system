/** @format */

import User from '../../models/User.js';
import { hashPassword } from '../../services/cryptographyService.js';
import expressAsyncHandler from 'express-async-handler';

const register = expressAsyncHandler(async (req, res, next) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const phone = req.body.phone;
	const password = req.body.password;
	const state = req.body.state;
	const city = req.body.city;
	const cluster = req.body.cluster;
	try {
		if (await User.findOne({ phone })) {
			res.status(404).send({
				message: 'Phone Number is already registered, Please login'
			});
		}
		const user = new User({
			firstName,
			lastName,
			phone,
			password,
			state,
			city,
			cluster
		});
		user.password = await hashPassword(user.password);
		user.save();

		const userActivity = new Userlog({
			user: newUser,
			createdAt: new Date(),
			activity: 'User Subscribed'
		});
		userActivity.save();

		res.status(200).send({
			message: 'Registation Complete, Kindly Login'
		});
	} catch (error) {
		res.status(200).send({
			message: 'Registation Complete, Kindly Login'
		});
	}
});

export { register };
