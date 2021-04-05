import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { verifyToken } from '../helpers/jwtHelpers';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer')) return next(createHttpError(401, 'Unathorized')); //401, 'Unathorized'

	const split = authorization.split('Bearer ');
	if (split.length !== 2) return next(createHttpError(401, 'Unathorized')); //401, 'Unathorized'

	const token = split[1];

	try {
		const decoded = await verifyToken(token);
		res.locals = { ...res.locals, authorized: true, ...decoded };
		next();
	} catch (error) {
		const errorMessage = error.name === 'JsonWebTokenError' ? 'Unathorized' : error.message;
		return next(new createHttpError.Unauthorized(errorMessage));
	}
};

export default checkAuth;
