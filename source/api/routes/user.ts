import express from 'express';
const router = express.Router();

import {getUserById, createUser} from '../controllers/user';
import methodError from '../helpers/MethodError';

router
	.route('/:id')
	.get(getUserById)
	.post(createUser)
	.all(methodError({allowed: ['GET']}));

export = router;

//routes
// GET /api/users/:userid - get User
// POST /api/users/ - create User
// UPDATE /api/users/:userid
// DELETE /api/users/:userid
