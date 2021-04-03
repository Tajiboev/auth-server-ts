import Joi from 'joi';

export const signupSchema = Joi.object({
	firstName: Joi.string().alphanum().min(2).max(30).required(),
	lastName: Joi.string().alphanum().min(2).max(30).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$')),
	email: Joi.string().email().lowercase().required()
});

export const loginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$'))
});