import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer')) return next(createHttpError(401, 'Unathorized')); //401, 'Unathorized'

	const split = authorization.split('Bearer ');
	if (split.length !== 2) return next(createHttpError(401, 'Unathorized')); //401, 'Unathorized'

	const token = split[1];

	try {
		// TODO: verify token using jwt and set res.locals
		// const decodedToken = await admin.auth().verifyIdToken(token);

		// res.locals = {...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email};
		return next();
	} catch (error) {
		return next(createHttpError.Unauthorized);
	}
};

export default checkAuth;
