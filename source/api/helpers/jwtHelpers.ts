import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../../config';

export const signToken = (user: IUser, tokenType: 'access' | 'common'): Promise<string | undefined | Error> => {
	const payload = { _id: user._id };
	const secret = tokenType === 'access' ? 'access_token_secret' : 'common_token_secret';
	const tokenSecret = config.jwt[secret];

	return new Promise((resolve, reject) => {
		jwt.sign(payload, tokenSecret, { issuer: 'website.com', expiresIn: '1d', audience: user._id }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

export const verifyToken = (token: string): Promise<object | undefined | JsonWebTokenError> => {
	const tokenSecret = config.jwt.access_token_secret;

	return new Promise((resolve, reject) => {
		jwt.verify(token, tokenSecret, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		});
	});
};