import jwt from 'jsonwebtoken';
import { jwtSecrets } from '../../config';
import { IUser } from './interfaces';

const sign = (user: IUser) => {
	let result = new Promise((resolve, reject) => {
		jwt.sign({ id: user._id }, jwtSecrets.access_token_secret, { algorithm: 'RS256' }, function (err, token) {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
	return result;
};

const decode = (token: string) => {
	let result = new Promise((resolve, reject) => {
		jwt.verify(token, jwtSecrets.access_token_secret, function (err, decoded) {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		});
	});
	return result;
};

export { sign, decode };
