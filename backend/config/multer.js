/** @format */

import multer from 'multer';
import path from 'path';

function uploadFile(req, details) {
	// set storage engine
	const storage = multer.memoryStorage({
		destination: details.destination,
		filename: (req, file, callback) => {
			callback(null, Date.now() + '-' + file.originalname);
		}
	});

	// init upload
	const upload = multer({
		storage,
		limits: { fileSize: details.fileLimit },
		fileFilter: (req, file, callback) => {
			// 1. create a regEx to store allowed extensions

			const allowedExts = new RegExp(details.allowedExts);
			// 2. check if extension of file uploaded is passed
			const extPassed = allowedExts.test(path.extname(file.originalname).toLowerCase());

			// 3. check if the mimeType is passed
			const mimeType = allowedExts.test(file.mimetype);

			// 4. check if both are passed
			if (extPassed && mimeType) {
				return callback(null, true);
			} else {
				return callback(
					{
						message: "That filetype isn't allowed!"
					},
					false
				);
			}
		}
	}).single(details.field);

	return upload;
}

export default uploadFile;
