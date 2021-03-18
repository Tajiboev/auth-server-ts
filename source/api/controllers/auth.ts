/* 
	TODO: [get] /signup ---> create user & return jwt ✔️
	TODO: [get] /login ---> find user & return jwt ✔️
*/

import {NextFunction, Request, Response} from 'express';
import {GeneralError} from '../../utils/error';
import User from '../models/user';
import bcrypt from 'bcrypt';
import signJWT from '../helpers/signJWT';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	const {email, password, firstName, lastName} = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			public: {
				email,
				firstName,
				lastName
			},
			private: {
				password: hashedPassword
			}
		});

		const token = signJWT(user);

		const response = {
			user: user.public,
			token
		};
		res.status(201).json(response);
	} catch (error) {
		next(new GeneralError(error.message, 500, error));
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const {email, password} = req.body;

	try {
		const user = await User.findOne({email});
		if (!user) return next(new GeneralError('Unathorized, wrong email', 403));

		const match = await bcrypt.compare(password, user.private.password);
		if (!match) return next(new GeneralError('Unathorized, wrong password', 403));

		const token = signJWT(user);

		const response = {
			user: user.public,
			token
		};

		res.status(200).json(response);
	} catch (error) {
		next(new GeneralError(error.message, 500, error));
	}
};
