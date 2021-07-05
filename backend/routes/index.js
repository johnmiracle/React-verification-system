/** @format */

import express from 'express';
import { register } from '../controllers/auth/register.js';
import { login } from '../controllers/auth/login.js';
import { passwordReset, resetPassword, resetPasswordVerify } from '../controllers/auth/passwordReset.js';

const indexRouter = express.Router();

indexRouter.post('/login', login);

indexRouter.post('/register', register);

indexRouter.post('/password_reset', passwordReset);

indexRouter.post('/password_code_reset', resetPasswordVerify);

indexRouter.post('/password-reset', resetPassword);

export default indexRouter;
