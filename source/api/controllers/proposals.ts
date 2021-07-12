import { NextFunction, Request, Response } from 'express';
// import createHttpError from 'http-errors';
import Proposal from '../models/proposalModel';

const addProposal = (req: Request, res: Response, next: NextFunction) => {
	const { title, message, price } = req.body;
	const { id } = res.locals;

	Proposal.create({
		author: id,
		title,
		message,
		price
	})
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			next(err);
		});
};

export { addProposal };
