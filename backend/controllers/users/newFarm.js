/** @format */

import expressAsyncHandler from 'express-async-handler';

export const newFarm = () => {
	expressAsyncHandler(async function (req, res, next) {
		const farm_name = req.body.farmName;
		const farm_size = req.body.farmSize;
		const farm_capacity = req.body.farmCapacity;

		let activity = `Created a new farm ( ` + farm_name + ` )`;

		try {
			const farm = new Farm({
				user: req.user,
				farm_name,
				farm_size,
				farm_capacity
			});

			//Log acivity
			const userActivity = new Userlog({
				user: req.user,
				createdAt: new Date(),
				activity
			});

			// Save New History
			await farm.save();

			// Save User Log Activity
			await userActivity.save();
			res.status(201).send({ message: 'Farm Successfully Created', newFarm });
		} catch (error) {
			throw error;
		}
	});
};

export const newFarmId = () => {
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

		const farm = await Farm.findOne({ _id: req.params.id });
		let farm_name = farm.farm_name;
		let activity = farm_name + ` was updated `;
		try {
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

			//Log acivity
			const userActivity = new Userlog({
				user: req.user,
				createdAt: new Date(),
				activity
			});

			// Save User Log Activity
			await userActivity.save();

			res.status(200).send({ message: 'Farm Successfully Updated' });
		} catch (error) {
			throw error;
		}
	});
};
