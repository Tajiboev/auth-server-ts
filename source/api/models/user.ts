import mongoose, {Schema} from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
	{
		email: {type: String, required: true, unique: true, lowercase: true, trim: true},
		emailVerified: {type: Boolean, default: false},
		emailVerificationToken: {type: String, required: true},
		password: {type: String, required: true},
		name: {
			firstName: {type: String, required: true},
			lastName: {type: String, required: true}
		}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<IUser>('User', UserSchema);
