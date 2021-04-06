import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { error } = await schema.validateAsync(req.body, { abortEarly: false });
			if (error) throw createHttpError(400, 'Invalid request body');
			next();
		} catch (error) {
			next(createHttpError(500, 'Validation error'));
		}
	};
};
