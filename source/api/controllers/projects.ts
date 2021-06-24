import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Project from '../models/project';
import User from '../models/user';

const listProjects = (req: Request, res: Response, next: NextFunction) => {
	Project.find()
		.populate('author', '_id email', User)
		.exec()
		.then((result) => {
			res.status(200).json({ projects: result });
		})
		.catch((err) => {
			next(err);
		});
};

const addProject = (req: Request, res: Response, next: NextFunction) => {
	const { title, description, budget, deadline } = req.body;
	const { id } = res.locals;

	Project.create({
		author: id,
		title,
		description,
		budget,
		deadline
	})
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			next(err);
		});
};

export { listProjects, addProject };
