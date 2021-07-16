import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { jwtSecrets } from '../config';

const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer')) {
		console.error('No auth header or header does not start with Bearer');
		return next(createHttpError(401, 'Unathorized'));
	}

	const split = authorization.split('Bearer ');
	if (split.length !== 2) {
		console.error('No token probably');
		return next(createHttpError(401, 'Unathorized'));
	}

	const token = split[1];

	jwt.verify(token, jwtSecrets.token_secret, (err, decoded) => {
		if (err) {
			console.error('jwt error', err);
			return next(createHttpError(401, 'Unathorized'));
		}
		res.locals = { ...res.locals, authorized: true, ...decoded };
		next();
	});
};

export default checkAuthentication;
