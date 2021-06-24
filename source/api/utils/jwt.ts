import { jwtSecrets } from '../../config';
import jwt from 'jsonwebtoken';

const sign = (id: string): Promise<Error | string | undefined> => {
	return new Promise((resolve, reject) => {
		jwt.sign({ id }, jwtSecrets.token_secret, { expiresIn: '1d' }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

export { sign };
