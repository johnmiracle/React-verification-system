/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import History from '../models/History.js';
import Product from '../models/Products.js';
import Farm from '../models/Farm.js';
import User from '../models/User.js';
import { isUser, isAuth } from '../config.js';
import Userlog from '../models/Userlog.js';

const userRouter = express.Router();

userRouter.post(
	'/verify-product',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const codeNumber = req.body.code;
		const farmId = req.body.farmInfo;

		let verifyProduct = await Product.findOne({ pin_code: codeNumber });

		let historyResult = await History.findOne({ pin_code: codeNumber });

		if (historyResult) {
			return res.status(404).send({
				message: 'YOUR PRODUCT HAS BEEN USED!'
			});
		}
		if (!verifyProduct) {
			return res.status(404).send({
				message: 'DO NOT BUY!'
			});
		}
		const newHistory = new History({
			user: req.user,
			Date: new Date(),
			serial: verifyProduct.serial,
			batch_no: verifyProduct.batch_no,
			pin_code: verifyProduct.pin_code,
			product: verifyProduct.product,
			point: verifyProduct.points
		});

		// Farm ID
		const farm = await Farm.findOne({ _id: farmId });

		// Farm Point
		let farmPoint = farm.accured_points;

		// product point
		let productpoint = verifyProduct.points;

		// sum of prouct point and farmpoint
		const updatedPoint = await (farmPoint + productpoint);

		// Update Farm Point
		await Farm.updateOne({ _id: farmId }, { $set: { accured_points: updatedPoint } });

		// User ID
		const user = await User.findOne({ _id: req.user._id });
		const userPoint = user.points;
		const updatedUserPoint = await (userPoint + 10);

		// Update User Point
		await User.updateOne({ _id: req.user._id }, { $set: { points: updatedUserPoint } });

		//Log acivity
		const userActivity = new Userlog({
			user: req.user,
			createdAt: new Date(),
			activity: `Verfied product on ` + farm.farm_name
		});
		// Save New History
		await newHistory.save();

		await userActivity.save();

		res.status(201).send(verifyProduct);

		await Product.findByIdAndDelete({ _id: verifyProduct._id });
	})
);

userRouter.post(
	'/add_farm/',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const farm_name = req.body.farmName;
		const farm_size = req.body.farmSize;
		const farm_capacity = req.body.farmCapacity;

		const newFarm = new Farm({
			user: req.user,
			farm_name,
			farm_size,
			farm_capacity
		});

		let activity = `Created a new farm ( ` + farm_name + ` )`;

		//Log acivity
		const userActivity = new Userlog({
			user: req.user,
			createdAt: new Date(),
			activity
		});

		// Save New History
		await newFarm.save();

		// Save User Log Activity
		await userActivity.save();
		res.status(201).send({ message: 'Farm Successfully Created', newFarm });
	})
);

userRouter.post(
	'/add_farm/:id',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const num_bird_stocked = req.body.numOfStock;
		const stocking_date = req.body.stockingDate;
		const stock_due_date = req.body.farmDueDay;
		const farm_type = req.body.farmType;
		const poultry_type = req.body.poultryType;
		const num_of_feeds = req.body.numOfFeed;
		const expected_points = req.body.expectedPoints;
		const duration = req.body.farmDays;
		const num_of_DOC = req.body.numOfDOC;

		await Farm.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					num_bird_stocked,
					stocking_date,
					stock_due_date,
					expected_points,
					farm_type,
					poultry_type,
					num_of_DOC,
					duration,
					num_of_feeds
				}
			}
		);

		let activity = farm_name + ` was updated `;

		//Log acivity
		const userActivity = new Userlog({
			user: req.user,
			createdAt: new Date(),
			activity
		});

		// Save User Log Activity
		await userActivity.save();

		res.status(200).send({ message: 'Farm Successfully Updated' });
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
		const user = await User.findOne({ _id: req.user._id });
		let userPoint = await user.points;
		res.status(200).send(userPoint.toString());
	})
);

userRouter.post('/:id', isAuth, isUser, async (req, res) => {
	const userId = req.params.id;
	const user = await User.findById(userId);
	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.phone = req.body.phone || user.phone;
		user.address = req.body.address || user.address;
		user.country = req.body.country || user.country;
		user.state = req.body.state || user.state;
		user.city = req.body.city || user.city;
		user.cluster = req.body.cluster || user.cluster;
		user.password = req.body.password || user.password;

		await User.updateOne(
			{ _id: userId },
			{ $set: { firstName, lastName, phone, address, country, state, city, cluster, password } }
		);
		res.send({
			_id: updatedUser.id,
			phone: updatedUser.phone,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			points: updatedUser.points,
			state: updatedUser.state,
			city: updatedUser.city,
			cluster: updatedUser.cluster,
			token: getToken(updatedUser)
		});
	} else {
		res.status(404).send({ message: 'User Not Found' });
	}
});

export default userRouter;
