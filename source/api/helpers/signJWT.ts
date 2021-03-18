import {IUser} from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../../config';

const signJWT = (user: IUser): string => {
	const payload = {_id: user._id, email: user.public.email};

	const token = jwt.sign(payload, config.jwt.key, {
		expiresIn: '1d',
		issuer: config.jwt.issuer
	});

	return token;
};

export default signJWT;
