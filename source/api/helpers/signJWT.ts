import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../../config';

export const signToken = (tokenType: 'access' | 'refresh', user: IUser): Promise<string | undefined | Error> => {
	const payload = tokenType === 'access' ? { _id: user._id } : {};

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			config.jwt.access_token_secret,
			{ issuer: 'freelance.uz', expiresIn: tokenType === 'access' ? '1d' : '1y', audience: user._id },
			(err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token);
			}
		);
	});
};

export const verifyToken = (
	tokenType: 'access' | 'refresh',
	token: string
): Promise<object | undefined | JsonWebTokenError> => {
	const tokenSecret = tokenType === 'access' ? 'access_token_secret' : 'refresh_token_secret';

	return new Promise((resolve, reject) => {
		jwt.verify(token, config.jwt[tokenSecret], (err, decoded) => {
			if (err) {
				reject(err);
			}
			resolve(decoded);
		});
	});
};
