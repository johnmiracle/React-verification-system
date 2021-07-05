/** @format */

import expressAsyncHandler from 'express-async-handler';

const productVerify = () => {
	expressAsyncHandler(async function (req, res, next) {
		const codeNumber = req.body.code;
		const farmId = req.body.farmInfo;

		let verifyProduct = await Product.findOne({ pin_code: codeNumber });

		try {
			if (!verifyProduct) {
				return res.status(404).send({
					message: 'DO NOT BUY!'
				});
			}

			if (await History.findOne({ pin_code: codeNumber })) {
				return res.status(404).send({
					message: 'YOUR PRODUCT HAS BEEN USED!, KINDLY TRY AGAIN'
				});
			}

			const history = new History({
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
			await history.save();

			await userActivity.save();

			res.status(201).send(verifyProduct);

			await Product.findByIdAndDelete({ _id: verifyProduct._id });
		} catch (err) {}
	});
};

export { productVerify };
