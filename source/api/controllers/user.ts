import {Request, Response, NextFunction} from 'express';

import bcryptsjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';

import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import User from '../models/user';
import Logger from '../../utils/Logger';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const {email, password, name, accountType} = req.body;

	bcryptsjs.hash(password, 10, (hashError, hashedPassword) => {
		if (hashError) return next(new ErrorWithStatusCode('Hash error', 500));

		User.create({
			email: email,
			password: hashedPassword,
			name: {
				firstName: name.firstName,
				lastName: name.lastName
			},
			accountType: accountType
		})
			.then((result) => {
				res.status(201).json({user: result});
			})
			.catch((error) => {
				Logger.error('createUser', 'catch', error);
				return next(new ErrorWithStatusCode('Could not create user', 500));
			});
	});
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	Logger.info('Controller - getUserById', `id: ${req.params.id}`);
	const {id} = req.params;
	if (!id) return next(new ErrorWithStatusCode('No id provided', 400));
	try {
		const user = await User.findOne({_id: id}).exec();
		if (user) res.status(200).json(user);
		else {
			return next(new ErrorWithStatusCode('Failed to retrieve user data', 404));
		}
	} catch (e) {
		return next(new ErrorWithStatusCode('Failed to retrieve user data', 400));
	}
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.find().exec();
		if (users) res.status(200).json(users);
		else {
			return next(new ErrorWithStatusCode('Failed to retrieve all users', 404));
		}
	} catch (e) {
		return next(new ErrorWithStatusCode('Failed to retrieve all users', 400));
	}
};

// GET /api/users/:userid - get User
// POST /api/users/ - create User
// UPDATE /api/users/:userid
// DELETE /api/users/:userid
