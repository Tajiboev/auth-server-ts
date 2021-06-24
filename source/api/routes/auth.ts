import express from 'express';
const router = express.Router();

import methodError from '../utils/methodError';
import { signup, login } from '../controllers/auth';
import { loginSchema, signupSchema } from '../utils/validationSchemas';
import validateBody from '../middleware/validateBody';

router
	.route('/signup')
	.post(validateBody(signupSchema), signup)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/login')
	.post(validateBody(loginSchema), login)
	.all(methodError({ allowed: ['POST'] }));

export default router;
