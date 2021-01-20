/** @format */

import mongoose from 'mongoose';

const Userschema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please this field is required'],
		trim: true
	},
	lastName: {
		type: String,
		required: [true, 'Please this field is required'],
		trim: true
	},
	phone: {
		type: Number,
		required: [true, 'please this field is required'],
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please this field is required']
	},
	address: {
		type: String
	},
	points: {
		type: Number,
		default: 0
	},
	image: {
		type: String
	},
	state: {
		type: String,
		default: 'Not Filled Yet',
		trim: true
	},
	city: {
		type: String,
		trim: true
	},
	cluster: {
		type: String,
		trim: true
	},
	account: {
		type: String,
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
const User = mongoose.model('User', Userschema);

export default User;
