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

const addProject = async (req: Request, res: Response, next: NextFunction) => {
	const { title, description, budget, deadline } = req.body;
	const { userID } = res.locals;

	try {
		const project = await Project.create({
			author: userID,
			title,
			description,
			budget,
			deadline
		});
		const user = await User.findByIdAndUpdate(userID, { $push: { projects: [project['_id']] } }).exec();
		if (!user) throw new createHttpError.InternalServerError('error updating user returned null');

		res.status(201).json({ project });
	} catch (e) {
		next(e);
	}
};

const oneProject = (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	Project.findById(id)
		.exec()
		.then((project) => {
			if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);
			res.status(200).json({ project });
		})
		.catch((e) => {
			next(e);
		});
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { userID } = res.locals;

	try {
		const project = await Project.findById(id).exec();
		if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);

		if (project.author !== userID) throw new createHttpError.Unauthorized('You cannot delete this');

		await project.remove();
	} catch (e) {
		next(e);
	}
};

export { listProjects, oneProject, deleteProject, addProject };
