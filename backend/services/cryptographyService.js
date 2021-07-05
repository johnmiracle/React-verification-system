/** @format */

import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
	let hash;
	try {
		hash = await bcrypt.hash(password, 10);
	} catch (error) {
		//   TODO: add some logic to this catch. preferably create a customer error object
		

		throw error;
	}

	return hash;
};

export { hashPassword };
