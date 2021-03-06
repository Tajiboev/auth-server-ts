/* 
	TODO: [get] users/ ---> find all users ✔️
	TODO: [post] users/ ---> create new user 
	TODO: [get] users/:id ---> find single user details ✔️
	TODO: [delete] users/:id ---> detete user ✔️
*/

import {NextFunction, Request, Response} from 'express';
import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	User.find()
		.then((result) => {
			res.status(200).json({message: result});
		})
		.catch((err) => {
			res.status(500).json({message: err.message});
		});
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	User.findOne({_id: id})
		.then((result) => {
			res.status(200).json({message: result});
		})
		.catch((err) => {
			res.status(500).json({message: err.message});
		});
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	User.findOneAndDelete({_id: id})
		.then((result) => {
			res.status(200).json({message: result, removed: true});
		})
		.catch((err) => {
			res.status(500).json({message: err.message});
		});
};
