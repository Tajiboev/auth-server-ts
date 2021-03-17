// TODO: [post] auth/signup ---> create user & return jwt ✔️
// TODO: [post] auth/login --->  check user & return jwt✔️

import {NextFunction, Request, Response} from 'express';
import {GeneralError} from '../../utils/error';
import User from '../models/user';
import Credentials from '../models/credentials';

// import bcryptjs from 'bcryptjs';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	const {firstName, lastName, email, password} = req.body;
	if (!firstName || !lastName || !email || !password) return next(new GeneralError('Missing field(s)', 400));

	const credentials = await Credentials.create({email, password});
	const user = await User.create({firstName, lastName, credentails: credentials});
	res.status(201).json(user);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const {email, password} = req.body;
	if (!email || !password) return next(new GeneralError('Missing field(s)', 400));

	const credentials = await Credentials.findOne({email});
	if (!credentials) return next(new GeneralError('Unathorized', 403));

	if (password !== credentials.password) return next(new GeneralError('Unathorized', 403));

	res.status(200).json(credentials);
};

// signup -> create credentials & user, return user.token
// login ->  return user.token
