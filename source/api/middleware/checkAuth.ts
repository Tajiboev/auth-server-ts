import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import Logger from '../../utils/Logger';

const NAMESPACE = 'check auth';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	Logger.info(NAMESPACE, 'verifying token');

	let token = req.headers.authorization?.split(' ')[1];
	if (token) {
		jwt.verify(token, config.jwt.key, (error, decoded) => {
			if (error) {
				Logger.error(NAMESPACE, 'jwt verify error', error);
				return next(new ErrorWithStatusCode('Unathorized', 400));
			} else {
				res.locals.authorized = true;
				next();
			}
		});
	} else {
		return next(new ErrorWithStatusCode('No auth token', 400));
	}
};

export default checkAuth;
