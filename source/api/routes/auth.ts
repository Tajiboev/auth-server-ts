import express from 'express';
const router = express.Router();

import methodError from '../helpers/methodError';
import { signup, login } from '../controllers/auth';
import { loginSchema, signupSchema } from '../helpers/validationSchemas';
import { validateBody } from '../middleware/validators';

router
	.route('/signup')
	.post(validateBody(signupSchema), signup)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/login')
	.post(validateBody(loginSchema), login)
	.all(methodError({ allowed: ['POST'] }));

export default router;
