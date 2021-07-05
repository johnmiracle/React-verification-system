/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import History from '../models/History.js';
import Product from '../models/Products.js';
import Farm from '../models/Farm.js';
import User from '../models/User.js';
import { isUser, isAuth } from '../config.js';
import Userlog from '../models/Userlog.js';
import { productVerify } from '../controllers/users/productVerify.js';
import { newFarm, newFarmId } from '../controllers/users/newFarm.js';

const userRouter = express.Router();

userRouter.post('/verify-product', isAuth, isUser, productVerify);

userRouter.post('/add_farm/', isAuth, isUser, newFarm);

userRouter.post('/add_farm/:id', isAuth, isUser, newFarmId);

userRouter.post(
	'/profile_image',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		let dataUrl = req.body.image64;

		// Update User profile image
		await User.updateOne({ _id: req.user._id }, { $set: { image: dataUrl } });

		// Log acivity
		const userActivity = new Userlog({
			user: req.user,
			createdAt: new Date(),
			activity: 'User updated profile picture'
		});

		await userActivity.save();

		res.status(200).send({ message: 'Profile Picture updated successfully' });
	})
);

userRouter.get(
	'/all-farms',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const farms = await Farm.find({ user: req.user });
		if (farms) {
			res.status(200).send(farms);
		} else {
			console.log(err);
			res.status(404).send({ message: 'Error getting farms' });
		}
	})
);

userRouter.get(
	'/farm/:id',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const farm = await Farm.findOne({ _id: req.params.id });
		if (farm) {
			res.status(200).send(farm);
		} else {
			console.log(err);
			res.status(404).send({ message: 'Error getting farm detail' });
		}
	})
);

userRouter.get(
	'/history',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const histories = await History.find({ user: req.user }).populate('user');
		res.status(200).send(histories);
	})
);

userRouter.get(
	'/profile',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const logs = await Userlog.find({ user: req.user }).sort({ createdAt: -1 }).limit(6);
		res.status(200).send(logs);
	})
);

userRouter.get(
	'/detail',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const {
			_id,
			points,
			image,
			firstName,
			lastName,
			cluster,
			address,
			city,
			state,
			phone
		} = await User.findOne({ _id: req.user._id });
		res.status(200).send({
			_id,
			points,
			image,
			firstName,
			lastName,
			cluster,
			address,
			city,
			state,
			phone
		});
	})
);

userRouter.post(
	'/:id',
	isAuth,
	isUser,
	expressAsyncHandler(async (req, res) => {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (user) {
			user.firstName = req.body.firstName || user.firstName;
			user.lastName = req.body.lastName || user.lastName;
			user.phone = req.body.phone || user.phone;
			user.address = req.body.address || user.address;
			user.state = req.body.state || user.state;
			user.city = req.body.city || user.city;
			user.cluster = req.body.cluster || user.cluster;
			// const updatedUser = await user.save();

			const updatedUser = await User.updateOne(
				{ _id: userId },
				{
					$set: {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						phone: req.body.phone,
						address: req.body.address,
						state: req.body.state,
						city: req.body.city,
						cluster: req.body.cluster
					}
				}
			);
			res.send({
				_id: user.id,
				phone: user.phone,
				firstName: user.firstName,
				lastName: user.lastName,
				points: user.points,
				state: user.state,
				address: user.address,
				city: user.city,
				cluster: user.cluster
			});
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

export default userRouter;
