/** @format */

import mongoose from 'mongoose';

const Farmschema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	farm_name: {
		type: String,
		required: [true, 'please this field is required']
	},
	farm_size: {
		type: String,
		required: [true, 'please this field is required']
	},
	farm_capacity: {
		type: String,
		required: [true, 'please this field is required']
	},
	num_bird_stocked: {
		type: Number
	},
	stocking_date: {
		type: Date
	},
	stock_due_date: {
		type: Date
	},
	farm_type: {
		type: String
	},
	poultry_type: {
		type: String
	},
	accured_points: {
		type: Number,
		default: 0
	},
	expected_points: {
		type: Number
	},
	num_of_feeds: {
		type: Number
	},
	num_of_DOC: {
		type: Number
	},
	duration: {
		type: Number
	},
	terms_and_coniditions: {
		type: String,
		default: 'Yes'
	}
});

const Farm = mongoose.model('Farm', Farmschema);

export default Farm;
