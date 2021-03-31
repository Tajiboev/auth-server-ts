import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../../config';
import createHttpError from 'http-errors';

export const signToken = async (tokenType: 'access' | 'refresh', user: IUser): Promise<string | undefined | Error> => {
	const payload = tokenType === 'access' ? { _id: user._id } : {};

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.jwt.access_token_secret,
			{ issuer: 'freelance.uz', expiresIn: tokenType === 'access' ? '1d' : '1y', audience: user._id },
			(err, token) => {
				if (err) {
					reject(createHttpError[500]);
				}
				resolve(token);
			}
		);
	});
};
export const verifyToken = async (
	tokenType: 'access' | 'refresh',
	token: string
): Promise<string | undefined | Error> => {
	const payload = tokenType === 'access' ? { _id: user._id } : {};

	return new Promise((resolve, reject) => {
		jwt.verify(token, config.jwt.access_token_secret, (err, token) => {
			if (err) {
				reject(createHttpError[500]);
			}
			resolve(token);
		});
	});
};
