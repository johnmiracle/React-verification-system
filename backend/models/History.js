/** @format */

import mongoose from 'mongoose';

const Historyschema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	Date: {
		type: Date,
		default: Date.now
	},
	usedSerial: {
		type: Number
	},
	batch: {
		type: Number
	},
	usedSerial_Product_Name: {
		type: String,
		required: [true, 'please this field is required'],
		trim: true
	},
	code: {
		type: String,
		unique: true
	},
	point: {
		type: Number
	}
});

const History = mongoose.model('History', Historyschema);

export default History;
