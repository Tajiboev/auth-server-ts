import {Request, Response, NextFunction} from 'express';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.find().select({password: 0, __v: 0}).exec();
		if (users) res.status(200).json(users);
		else {
			return next(new ErrorWithStatusCode('Failed to retrieve user data', 404));
		}
	} catch (e) {
		return next(new ErrorWithStatusCode('Failed to retrieve user data', 400));
	}
};
