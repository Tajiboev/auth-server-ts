import express from 'express';
const router = express.Router();

import {getUserById, createUser, getAllUsers} from '../controllers/user';
import methodError from '../helpers/MethodError';

import checkExistingUser from '../middleware/checkExistingUser';

router
	.route('/register')
	.post(checkExistingUser, createUser)
	.all(methodError({allowed: ['POST']}));

router
	.route('/:id')
	.get(getUserById)
	.all(methodError({allowed: ['GET']}));

router
	.route('/')
	.get(getAllUsers)
	.all(methodError({allowed: ['GET']}));

export = router;

//routes
// GET /api/users/:userid - get User
// POST /api/users/ - create User
// UPDATE /api/users/:userid
// DELETE /api/users/:userid
