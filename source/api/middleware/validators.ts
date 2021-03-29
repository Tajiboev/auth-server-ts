import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'joi';

export const validateBody = (shema: Schema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { error } = await shema.validateAsync(req.body, { abortEarly: false });
		if (error) return next(createHttpError(422, 'Validation error'));
		next();
	};
};
