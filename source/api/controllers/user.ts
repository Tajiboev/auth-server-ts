/* 
	TODO: [get] users/ ---> find all users ✔️
	TODO: [post] users/ ---> create new user 
	TODO: [get] users/:id ---> find single user details ✔️
	TODO: [delete] users/:id ---> detete user ✔️
*/

import {NextFunction, Request, Response} from 'express';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import hashPassword from '../helpers/hashPassword';
import User from '../models/user';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const {name, email, password, accountType} = req.body;
	if (!name || !email || !password || !accountType) res.status(400).json({message: 'Missing field(s)'});
	hashPassword(password)
		.then((hashedPassword) => {
			User.create({
				email: email,
				password: hashedPassword,
				accountType: accountType,
				name: name
			})
				.then((user) => {
					res.status(201).json({
						user: user
					});
				})
				.catch((error) => {
					return next(new ErrorWithStatusCode('Could not create user', 400, error));
				});
		})
		.catch((hashError) => {
			return next(new ErrorWithStatusCode('Could not hash password', 500, hashError));
		});
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	User.find()
		.then((result) => {
			res.status(200).json({message: result});
		})
		.catch((error) => {
			return next(new ErrorWithStatusCode('Could not find users', 400, error));
		});
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	User.findOne({_id: id})
		.then((result) => {
			result && res.status(200).json({message: result});
			return next(new ErrorWithStatusCode('Could not find user', 404));
		})
		.catch((error) => {
			return next(new ErrorWithStatusCode('Could not find user', 500, error));
		});
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	User.findOneAndDelete({_id: id})
		.then((result) => {
			res.status(200).json({message: result, removed: true});
		})
		.catch((error) => {
			return next(new ErrorWithStatusCode('Could not delete user', 500, error));
		});
};
