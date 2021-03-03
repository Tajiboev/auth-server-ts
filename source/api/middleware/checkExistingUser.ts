import {NextFunction, Request, Response} from 'express';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import User from '../models/user';

const checkExistingUser = async (req: Request, res: Response, next: NextFunction) => {
	const {email} = req.body;

	if (!email) {
		return next(new ErrorWithStatusCode('Invalid email', 400));
	}

	const emailExists = await User.exists({email: email});
	if (emailExists) return next(new ErrorWithStatusCode('Email already in use', 400));

	next();
};

export default checkExistingUser;
