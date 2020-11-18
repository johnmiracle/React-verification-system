/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User';
import History from '../models/History';
import Product from '../models/Products';
import { isAdmin, isAuth } from '../config';
import qrcode from 'qrcode';

const router = express.Router();

router.post(
	'/code-generator',
	expressAsyncHandler(async function (req, res, next) {
		try {
			const product = req.body.productName;
			const serial = req.body.serialNumber;
			const batch_no = req.body.batchNumber;
			const points = req.body.point;

			console.log(product, serial, batch_no, points);

			let max = 10000;
			let min = 1000;

			const array_length = 2;

			for (let i = 0; i < array_length; i++) {
				// create the unique number
				const uniquePin = Math.floor(Math.random() * (max - min + 1));

				// create the QRcode for each generated code
				let url = await new qrcode.toDataURL(`${uniquePin}`, { errorCorrectionLevel: 'H' });

				const productCode = new Product({
					product,
					serial,
					batch_no,
					pin_code: uniquePin,
					QRcode: url,
					points
				});
				const newProduct = await productCode.save();
			}
			res.status(201).send({ message: 'Product Added Successfully!!!'});
		} catch (err) {
			console.log(err);
			return res.status(404).send({ message: 'Error Adding Product!!!' });
		}
	})
);

router.get(
	'/users',
	isAuth,
	isAdmin,
	expressAsyncHandler(async function (req, res, next) {
		const users = await User.find({});
		res.status(200).send(users);
	})
);

router.get(
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

router.get(
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

router.get(
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

router.get(
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

module.exports = router;
