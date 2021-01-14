import mongoose from 'mongoose';

const Userlogschema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	activity: {
		type: String,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
const Userlog = mongoose.model('Userlog', Userlogschema);

export default Userlog;
