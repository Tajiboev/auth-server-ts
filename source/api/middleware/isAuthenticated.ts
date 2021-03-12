import {Request, Response, NextFunction} from 'express';
import {GeneralError} from '../../utils/error';

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	const {authorization} = req.headers;

	if (!authorization) return next(new GeneralError('Unauthorized', 401));

	if (!authorization.startsWith('Bearer')) return next(new GeneralError('Unauthorized', 401));

	const split = authorization.split('Bearer ');
	if (split.length !== 2) return next(new GeneralError('Unauthorized', 401));

	const token = split[1];

	try {
		// TODO: verify token using jwt and set res.locals
		// const decodedToken = await admin.auth().verifyIdToken(token);

		// res.locals = {...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email};
		return next();
	} catch (error) {
		return next(new GeneralError('Unauthorized', 401, error));
	}
}
