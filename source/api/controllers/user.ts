/* 
	TODO: [get] users/ ---> find all users ✔️
	TODO: [get] users/:id ---> find single user details ✔️
	TODO: [delete] users/:id ---> detete user ✔️
*/

import {NextFunction, Request, Response} from 'express';
import {GeneralError} from '../../utils/error';
import User from '../models/user';

// import bcryptjs from 'bcryptjs';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	User.find()
		.then((result) => {
			res.status(200).json({status: 'ok', users: result});
		})
		.catch((error) => next(new GeneralError('Could not find users', 500, error)));
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;

	User.findOne({_id: id})
		.then((user) => (user ? res.status(200).json({status: 'ok', user: user}) : next(new GeneralError('Could not find user', 404))))
		.catch((error) => next(new GeneralError('Could not find user', 500, error)));
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	User.findOneAndDelete({_id: id})
		.then((result) => (result ? res.status(200).json({status: 'ok', removed: true}) : next(new GeneralError('Could not delete user', 400))))
		.catch((error) => next(new GeneralError('Could not delete user', 500, error)));
};
