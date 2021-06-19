import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user';
import { sign } from '../utils/jwt';

const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password, firstName, lastName } = req.body;

		const userExists = await User.exists({ email });
		if (userExists) throw new createHttpError.Conflict('User with same email already exists');

		const user = await User.create({ email, password, firstName, lastName });
		const token = await sign(user);

		res.status(201).json({ ...user, token });
	} catch (error) {
		next(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) throw new createHttpError.Unauthorized();

		const pwdMatch = user.password === password;
		if (!pwdMatch) throw new createHttpError.Unauthorized();

		const token = await sign(user);

		res.status(200).json({ ...user, token });
	} catch (error) {
		next(error);
	}
};

export { signup, login };
