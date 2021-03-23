import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../../config';

const signJWT = async (user: IUser): Promise<string | undefined | Error> => {
	const payload = { _id: user._id };

	return new Promise((resolve, reject) => {
		jwt.sign(payload, config.jwt.secret, config.jwt.options, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

export default signJWT;
