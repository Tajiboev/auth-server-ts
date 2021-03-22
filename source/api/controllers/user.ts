/* 
	TODO: [get] users/ ---> find all users ✔️
	TODO: [get] users/:id ---> find single user details ✔️
	TODO: [delete] users/:id ---> detete user ✔️
*/

import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user';

// import bcryptjs from 'bcryptjs';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	User.find()
		.then((result) => {
			res.status(200).json({ status: 'ok', users: result });
		})
		.catch((error) => {
			throw new createHttpError.InternalServerError();
		});
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	User.findOne({ _id: id })
		.then((user) =>
			user ? res.status(200).json({ status: 'ok', user: user }) : next(new createHttpError.NotFound())
		)
		.catch((error) => next(new createHttpError.InternalServerError()));
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	User.findOneAndDelete({ _id: id })
		.then((result) =>
			result ? res.status(200).json({ status: 'ok', removed: true }) : next(new createHttpError.BadRequest())
		)
		.catch((error) => next(new createHttpError.InternalServerError()));
};
