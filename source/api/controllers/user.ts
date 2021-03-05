import {Request, Response, NextFunction} from 'express';
import ErrorWithStatusCode from '../../utils/ErrorWithStatusCode';
import hashPassword from '../helpers/hashPassword';

export const getHash = async (req: Request, res: Response, next: NextFunction) => {
	const {password} = req.body;
	hashPassword(password)
		.then((result) => {
			console.log(result);
			res.status(200).json({message: result});
		})
		.catch((error) => {
			console.error(error, 'controller error');
			return next(new ErrorWithStatusCode('WTF', 500));
		});
};
