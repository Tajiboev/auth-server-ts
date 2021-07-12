import { jwtSecrets } from '../../config';
import jwt from 'jsonwebtoken';

const signJWT = (id: string): Promise<Error | string> => {
	return new Promise((resolve, reject) => {
		jwt.sign({ userID: id }, jwtSecrets.token_secret, { expiresIn: '1d' }, (err, token) => {
			if (err) reject(new Error('Error signing JWT'));
			if (token) resolve(token);
		});
	});
};

export { signJWT };
