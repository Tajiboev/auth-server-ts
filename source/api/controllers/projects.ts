import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Project from '../models/project';
import User from '../models/user';
import { decode, sign } from '../utils/jwt';

const addProject = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, description, budget, deadline } = req.body;
		const token = req.headers.authorization?.split(' ')[1] || null;
		if (!token) throw new createHttpError.BadRequest();

		res.status(201).json({ ...user, token });
	} catch (error) {
		next(error);
	}
};
