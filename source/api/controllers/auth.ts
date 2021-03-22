/* 
	TODO: [get] /signup ---> create user & return jwt ✔️
	TODO: [get] /login ---> find user & return jwt ✔️
*/

import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import createHttpError from 'http-errors';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const user = new User({ email, password, firstName, lastName });
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		next(createHttpError(400, 'Could not create user', error));
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) throw new createHttpError.NotFound();

		const pwdMatch = user.checkPassword(password);
		console.log(pwdMatch);

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
