import express from 'express';
const router = express.Router();

import methodError from '../helpers/methodError';
import { signup, login } from '../controllers/auth';
import validate from '../middleware/validators';

router
	.route('/signup')
	.post(validate('signupSchema'), signup)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/login')
	.post(validate('loginSchema'), login)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/logout')
	.post(validate('signupSchema'), signup)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/refresh-token')
	.post(validate('loginSchema'), login)
	.all(methodError({ allowed: ['POST'] }));

export default router;
