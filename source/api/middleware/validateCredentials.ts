import {NextFunction, Request, Response} from 'express';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
	const validEmail = req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	if (!validEmail) throw new ErrorWithStatusCode('Please provide a valid email address', 400);
	// const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
	// return valid.test(email)
	next();
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
	const validPassword = req.body.password.match(/^(?=.*?[A-z])(?=.*?[0-9]).{8,}$/);
	if (!validPassword) throw new ErrorWithStatusCode('Password must contain minimum eight characters and include at least one number', 400);

	next();
};
