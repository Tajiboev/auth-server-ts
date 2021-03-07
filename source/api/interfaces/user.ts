import {Document} from 'mongoose';

export default interface IUser extends Document {
	email: string;
	emailVerified: boolean;
	password: string;
	name: {
		firstName: string;
		lastName: string;
	};
	accountType: 'work' | 'hire';
}
