import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import config from '../../config';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer')) return next(createHttpError(401, 'Unathorized')); //401, 'Unathorized'

	const split = authorization.split('Bearer ');
	if (split.length !== 2) return next(createHttpError(401, 'Unathorized')); //401, 'Unathorized'

	const token = split[1];

	try {
		jwt.verify(token, config.jwt.access_token_secret, (err, payload) => {
			if (err) {
				const errorMessage = err.name === 'JsonWebTokenError' ? 'Unathorized' : err.message;
				throw new createHttpError.Unauthorized(errorMessage);
			}
			res.locals = { ...res.locals, authorized: true, ...payload };
			next();
		});
	} catch (error) {
		return next(error);
	}
};

export default checkAuth;
