/** @format */

import User from '../../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import { hashPassword } from '../../services/cryptographyService.js';

import Nexmo from 'nexmo';

const nexmo = new Nexmo({
	apiKey: 'c8d302ef',
	apiSecret: 'M8WdIiJj19sMS428'
});

const passwordReset = expressAsyncHandler(async (req, res, next) => {
	const phone = req.body.phone;
	const message = 'React Farmsured';
	try {
		const user = await User.findOne({ phone });

		if (!user) {
			throw res.status(404).send({ message: 'User does not exist' });
		}

		if (user) {
			nexmo.verify.request({ number: phone, brand: message, country: 'NG' }, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					const verifyRequestId = result.request_id;
					res.status(200).send({ message: 'A reset code has been sent to your registered phone number', verifyRequestId });
				}
			});
		}
	} catch (error) {
		res.status(500).send({ message: 'Error connecting to server' });
	}
});

const resetPasswordVerify = expressAsyncHandler(async (req, res, next) => {
	const code = req.body.codeNum;
	const requestId = req.body.requestId;

	try {
		nexmo.verify.check(
			{
				request_id: requestId,
				code: code
			},
			(err, result) => {
				if (err) {
					console.error(err);
				} else {
					console.log(result);
					res.status(200).send({ message: 'verified' });
				}
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
});

const resetPassword = expressAsyncHandler(async (req, res, next) => {
	const password = req.body.password;
	const phone = req.body.phone;

	try {
		const user = User.updateOne(
			{ phone },
			{
				$set: {
					password: await hashPassword(password)
				}
			}
		);
		return res.status(200).send('Passoword reset successful');
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
});

export { passwordReset, resetPasswordVerify, resetPassword };
