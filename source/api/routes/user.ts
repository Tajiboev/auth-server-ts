import express from 'express';
const router = express.Router();

import {getAllUsers, getUserById, deleteUser, createUser} from '../controllers/user';
import methodError from '../helpers/methodError';

router
	.route('/')
	.get(getAllUsers)
	.post(createUser)
	.all(methodError({allowed: ['GET']}));

router
	.route('/:id')
	.get(getUserById)
	.delete(deleteUser)
	.all(methodError({allowed: ['GET', 'DELETE']}));

export = router;

/* 
	* primary routes
	TODO: [get] users/ ---> find all users
	TODO: [post] users/ ---> create new user
	TODO: [get] users/:id ---> find single user details
	TODO: [delete] users/:id ---> detete user
*/

/* 
	* secondary routes
	TODO: [get] users/verify/:token ---> verify user email
	TODO: [post] users/updateEmail/ ---> change user email
	TODO: [post] users/updatePassword/ ---> change user password
*/
