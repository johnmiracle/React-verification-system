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
	serial: {
		type: Number
	},
	batch_no: {
		type: Number
	},
	product: {
		type: String,
		required: [true, 'please this field is required'],
		trim: true
	},
	pin_code: {
		type: String,
		unique: true
	},
	point: {
		type: Number
	}
});

const History = mongoose.model('History', Historyschema);

export default History;
