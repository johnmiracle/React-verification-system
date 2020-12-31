/** @format */

import mongoose from 'mongoose';

const Productschema = new mongoose.Schema({
	product: {
		type: String,
		required: [true, 'Please this field is required'],
		trim: true
	},
	serial: {
		type: String,
		required: [true, 'please this field is required']
	},
	batch_no: {
		type: String,
		required: [true, 'please this field is required']
	},
	barcode: {
		type: String,
		required: [true, 'please this field is required']
	},
	pin_code: {
		type: String,
		required: [true, 'please this field is required'],
		unique: true
	},
	QRcode: {
		type: String,
		required: [true, 'please this field is required']
	},
	points: {
		type: Number,
		required: [true, 'please this field is required']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Product = mongoose.model('Product', Productschema);

export default Product;
