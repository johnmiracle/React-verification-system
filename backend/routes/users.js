/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import History from '../models/History.js';
import Product from '../models/Products.js';
import Farm from '../models/Farm.js';
import { isUser, isAuth } from '../config.js';

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

		// sum of prouct point and userpoint
		const updatedPoint = await (farmPoint + productpoint);

		// Update Farm Point
		await Farm.updateOne({ _id: farmId }, { $set: { accured_points: updatedPoint } });
		console.log(
			`farm point = ` +
				farmPoint +
				`, product point = ` +
				productpoint +
				`, the total point = ` +
				updatedPoint
		);

		// Save New History
		await newHistory.save();

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

		// Save New History
		await newFarm.save();
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

		console.log(req.params.id);

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

export default userRouter;
