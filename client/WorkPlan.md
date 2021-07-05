				function GenerateRandomNumber(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				// Generates a random alphanumberic character
				function GenerateRandomChar() {
					var chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ';
					var randomNumber = GenerateRandomNumber(0, chars.length - 1);

					return chars[randomNumber];
				}

				// Generates a Serial Number, based on a certain mask
				function GenerateSerialNumber(mask) {
					var serialNumber = '';

					if (mask != null) {
						for (var i = 0; i < mask.length; i++) {
							var maskChar = mask[i];

							serialNumber += maskChar == '0' ? GenerateRandomChar() : maskChar;
						}
					}
					return serialNumber;
				}

				// Generate a new Serial Number for a given mask
				let UniquePin = GenerateSerialNumber('00000-00000-00000-00000-00000');