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
	points: {
		type: Number,
		default: 0
	},
	account: {
		type: String,
		default: 'user'
	}
});
const User = mongoose.model('User', Userschema);

export default User