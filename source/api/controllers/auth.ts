import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { signToken } from '../helpers/jwtHelpers';
import User from '../models/user';

//* [post] /signup ---> create user & return jwt

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password, firstName, lastName } = req.body;

		const userExists = await User.exists({ email });
		if (userExists) throw new createHttpError.Conflict('User with same email already exists');

		const user = await User.create({ email, password, firstName, lastName });
		const accessToken = await signToken('access', user);

		res.status(201).json({ ...user, accessToken });
	} catch (error) {
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) throw new createHttpError.Unauthorized();

		const pwdMatch = await user.checkPassword(password);
		if (!pwdMatch) throw new createHttpError.Unauthorized();

		const accessToken = await signToken('access', user);

		res.status(200).json({ ...user, accessToken });
	} catch (error) {
		next(error);
	}
};
