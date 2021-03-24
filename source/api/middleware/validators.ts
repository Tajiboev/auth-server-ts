import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';

const validationSchemas = {
	signupSchema: Joi.object({
		firstName: Joi.string().alphanum().min(2).max(30).required(),
		lastName: Joi.string().alphanum().min(2).max(30).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$')),
		email: Joi.string().email().lowercase().required()
	}),

	loginSchema: Joi.object({
		email: Joi.string().email().lowercase().required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$'))
	})
};

const validate = (schemaName: 'signupSchema' | 'loginSchema') => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { error } = await validationSchemas[schemaName].validateAsync(req.body, { abortEarly: false });
		if (error) return next(createHttpError(422, 'Validation error', error));
		next();
	};
};

export default validate;
