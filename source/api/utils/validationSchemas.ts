import Joi from 'joi';

const signupSchema = Joi.object({
	firstName: Joi.string().alphanum().min(2).max(30).required(),
	lastName: Joi.string().alphanum().min(2).max(30).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$')),
	email: Joi.string().email().lowercase().required()
});

const loginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$'))
});

const projectSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	budget: Joi.string().required(),
	deadline: Joi.date().required()
});

export { signupSchema, loginSchema, projectSchema };
