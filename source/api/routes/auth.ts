import express from 'express';
const router = express.Router();

import methodError from '../helpers/methodError';
import {signup, login} from '../controllers/auth';

router
	.route('/signup')
	.post(signup)
	.all(methodError({allowed: ['POST']}));

router
	.route('/login')
	.post(login)
	.all(methodError({allowed: ['POST']}));

export = router;
