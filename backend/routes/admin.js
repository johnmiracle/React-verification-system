/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import History from '../models/History.js';
import Farm from '../models/Farm.js';
import Product from '../models/Products.js';
import { isAdmin, isAuth } from '../config.js';
import qrcode from 'qrcode';
import securePin from 'secure-pin';
import bwipjs from 'bwip-js';
import moment from 'moment';

const adminRouter = express.Router();

adminRouter.post(
	'/code-generator',
	expressAsyncHandler(async function (req, res, next) {
		try {
			const product = req.body.productName;
			const points = req.body.point;
			const array_length = req.body.numberOfProducts;
			let batch_no = moment()
				.toISOString()
				.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3$2$1');

			let serialNum = 1000;

			console.log(batch_no);

			// Create Barcode for Batch Number
			const data = await new bwipjs.toBuffer({
				bcid: 'code128',
				text: batch_no,
				scale: 4,
				height: 10,
				includetext: true,
				textxalign: 'center',
				backgroundcolor: 'FFFFFF',
				textfont: 'Inconsolata',
				textsize: 13,
				padding: 10
			});
			let dataUrl = `data:image/png;base64,` + data.toString('base64');

			for (let i = 0; i < array_length; i++) {
				const UniquePin = securePin.generatePinSync(16);

				// create the QRcode for each generated code
				let url = await new qrcode.toDataURL(`${UniquePin}`, { errorCorrectionLevel: 'H' });

				const productCode = new Product({
					product,
					serial: serialNum++,
					batch_no,
					barcode: dataUrl,
					pin_code: UniquePin,
					QRcode: url,
					points
				});
				const newProduct = await productCode.save();
			}
			res.status(201).send({ message: 'Product Added Successfully!!!' });
		} catch (err) {
			console.log(err);
			return res.status(404).send({ message: 'Error Adding Product!!!' });
		}
	})
);

adminRouter.get(
	'/users',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		const users = await User.find({});
		res.status(200).send(users);
	})
);

adminRouter.get(
	'/user/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		try {
			const histories = await Farm.find({ user: req.params.id }).populate('user');
			res.status(200).send(histories);
		} catch (error) {
			console.log(error);
			res.status(300).send({ message: 'Error getting User Activities' });
		}
	})
);

adminRouter.get(
	'/used_product',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		try {
			const products = await History.find({}).populate('user');
			res.status(200).send(products);
		} catch (error) {
			console.log(error);
			res.status(404).send({ message: 'Error getting products' });
		}
	})
);

adminRouter.get(
	'/admin-dashboard',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		const registeredUsers = await User.countDocuments({ account: 'user' });
		const products = await Product.countDocuments({});
		const usedPin = await History.countDocuments({});
		const registeredFarms = await Farm.countDocuments({});
		const registeredFarmsToday = await Farm.countDocuments({
			createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24) }
		});
		const registeredUsersToday = await User.countDocuments({
			account: 'user',
			createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24) }
		});

		const groupData = await Farm.aggregate([
			{
				$project: {
					day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
				}
			},
			{
				$group: {
					_id: { createdAt: '$day' },
					counts: { $sum: 1 }
				}
			},

			{
				$addFields: {
					createdAt: '$_id.Date'
				}
			},
			{ $sort: { _id: -1 } },
			{ $limit: 5 },
			{
				$project: {
					_id: false
				}
			}
		]);
		res.status(200).send({
			registeredUsers,
			products,
			usedPin,
			registeredFarms,
			registeredFarmsToday,
			registeredUsersToday,
			groupData
		});
	})
);

adminRouter.get(
	'/admin-dashboard-charts',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		const groupData = await Farm.aggregate([
			{
				$project: {
					day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
				}
			},
			{
				$group: {
					_id: { createdAt: '$day' },
					counts: { $sum: 1 }
				}
			},

			{
				$addFields: {
					createdAt: '$_id.Date'
				}
			},
			{ $sort: { _id: -1 } },
			{ $limit: 10 },
			{
				$project: {
					_id: false
				}
			}
		]);
		res.status(200).send(groupData);
	})
);

adminRouter.get(
	'/products',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		const products = await Product.find({});
		if (products) {
			res.status(200).send(products);
		} else {
			res.status(404).send({ message: 'Error getting products' });
		}
	})
);

export default adminRouter;
