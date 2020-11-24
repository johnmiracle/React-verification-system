/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import History from '../models/History.js';
import Product from '../models/Products.js';
import { isAdmin, isAuth } from '../config.js';
import qrcode from 'qrcode';

const adminRouter = express.Router();

adminRouter.post(
	'/code-generator',
	expressAsyncHandler(async function (req, res, next) {
		try {
			const product = req.body.productName;
			const serial = req.body.serialNumber;
			const batch_no = req.body.batchNumber;
			const points = req.body.point;
			const array_length = req.body.numberOfProducts;

			console.log(product, serial, batch_no, points, array_length);

			let max = 10000;
			let min = 1000;
			let serialNum = serial;

			for (let i = 0; i < array_length; i++) {
				function GenerateRandomNumber(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				// Generates a random alphanumberic character
				function GenerateRandomChar() {
					var chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ';
					var randomNumber = GenerateRandomNumber(0, chars.length - 1);

					return chars[randomNumber];
				}

				// Generates a Serial Number, based on a certain mask
				function GenerateSerialNumber(mask) {
					var serialNumber = '';

					if (mask != null) {
						for (var i = 0; i < mask.length; i++) {
							var maskChar = mask[i];

							serialNumber += maskChar == '0' ? GenerateRandomChar() : maskChar;
						}
					}
					return serialNumber;
				}

				// Generate a new Serial Number for a given mask
				let UniquePin = GenerateSerialNumber('00000-00000-00000-00000-00000');

				// create the QRcode for each generated code
				let url = await new qrcode.toDataURL(`${UniquePin}`, { errorCorrectionLevel: 'H' });

				const productCode = new Product({
					product,
					serial: serialNum++,
					batch_no,
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
			let id = req.params.id;
			const histories = await History.find({ user: req.params.id }).populate('user');
			res.status(200).send(histories);
		} catch (error) {
			res.status(300).send({ msg: 'Error getting User' });
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
		res.status(200).send(registeredUsers, products, usedPin);
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
