/** @format */
import expressAsyncHandler from 'express-async-handler';
import passport from '../../config/passport.js';
import { getToken } from '../../config.js';

const login = expressAsyncHandler(async (req, res, next) => {
	try {
		passport.authenticate('local', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user.password) {
				return res.status(404).send({ message: 'Invalided User ID or Password!!!' });
			}
			if (!user) {
				return res.status(404).send({
					message:
						"User ID & Password combination doesn't match any of our records, Kindly register!!!"
				});
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				} else {
					return res.send({
						_id: user.id,
						phone: user.phone,
						firstName: user.firstName,
						lastName: user.lastName,
						state: user.state,
						account: user.account,
						points: user.points,
						address: user.address,
						city: user.city,
						cluster: user.cluster,
						token: getToken(user)
					});
				}
			});
		})(req, res, next);
	} catch (err) {
		if (err) {
			return next(err);
		}
	}
});

export { login };
