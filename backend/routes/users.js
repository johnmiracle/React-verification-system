/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import History from '../models/History.js';
import Product from '../models/Products.js';
import { isUser, isAuth } from '../config.js';

const userRouter = express.Router();

userRouter.post(
	'/verify-product',
	isAuth,
	isUser,
	expressAsyncHandler(async function (req, res, next) {
		const codeNumber = req.body.code;

		let verifyProduct = await Product.findOne({ pin_code: codeNumber });

		let historyResult = await History.findOne({ pin_code: codeNumber });

		if (historyResult) {
			return res.status(404).send({
				message: 'Your Product key has been used, Kindly make a report'
			});
		}
		if (!verifyProduct) {
			return res.status(404).send({
				message: 'Your Product is Fake, Kindly make a report'
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

		// Point calculator
		const user = await User.findOne({ _id: req.user });

		// user point
		let userPoint = user.points;

		// product point
		let productpoint = verifyProduct.points;

		// sum of prouct point and userpoint
		const updatedPoint = await (userPoint + productpoint);

		// Update User Point
		await User.updateOne({ _id: req.user }, { $set: { points: updatedPoint } });
		console.log(
			`user point = ` +
				userPoint +
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

userRouter.get(
	'/product-verify',
	expressAsyncHandler(async function (req, res, next) {
		const scanCount = await History.countDocuments({ user: req.user });
		res.status(200).send(scanCount);
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
