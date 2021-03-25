import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../../config';
import createHttpError from 'http-errors';

export const signAccessToken = async (user: IUser): Promise<string | undefined | Error> => {
	const payload = { _id: user._id };

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.jwt.access_token_secret,
			{ ...config.jwt.options, audience: user._id },
			(err, token) => {
				if (err) {
					console.error('signAccessToken ->', err);
					reject(createHttpError[500]);
				}
				resolve(token);
			}
		);
	});
};
