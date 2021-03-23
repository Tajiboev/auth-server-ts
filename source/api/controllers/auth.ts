/*
 */

import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user';

//* [post] /signup ---> create user & return jwt

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const user = await User.create({ email, password, firstName, lastName });
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

//* [post] /login ---> find user & return jwt

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return next(new createHttpError.Unauthorized());

		const pwdMatch = await user.checkPassword(password);
		if (!pwdMatch) throw new createHttpError.Unauthorized();

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
