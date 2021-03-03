import express from 'express';
const router = express.Router();

import {getAllUsers} from '../controllers/user';
import methodError from '../helpers/methodError';

router
	.route('/')
	.get(getAllUsers)
	.all(methodError({allowed: ['GET']}));

export = router;
