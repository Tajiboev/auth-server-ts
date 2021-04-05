/*
 */

import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { signToken, verifyToken } from '../helpers/jwtHelpers';
import User from '../models/user';

//* [post] /signup ---> create user & return jwt

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password, firstName, lastName } = req.body;

		const userExists = await User.exists({ email });
		if (userExists) throw new createHttpError.Conflict('User with same email already exists');

		const user = await User.create({ email, password, firstName, lastName });
		const accessToken = await signToken(user, 'access');

		res.status(201).json({ ...user, accessToken });
	} catch (error) {
		next(error);
	}
};

//* [post] /login ---> find user & return jwt

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) throw new createHttpError.Unauthorized();

		const pwdMatch = await user.checkPassword(password);
		if (!pwdMatch) throw new createHttpError.Unauthorized();

		const accessToken = await signToken(user, 'access');

		res.status(200).json({ ...user, accessToken });
	} catch (error) {
		next(error);
	}
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
	const { id, token } = req.params;

	try {
		const validToken = await verifyToken(token);
		if (!validToken) throw new createHttpError.BadRequest();

		const updated = await User.updateOne({ _id: id }, { isVerified: true }).exec();
		console.log(updated);
		res.status(200).json({ message: 'Email has been verified!' });
	} catch (error) {
		next(error);
	}
};
