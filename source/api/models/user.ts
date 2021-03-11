import mongoose, {Schema, Document} from 'mongoose';

interface IUser extends Document {
	email: string;
	emailVerified: boolean;
	password: string;
	firstName: string;
	lastName: string;
}

const UserSchema: Schema = new Schema(
	{
		email: {type: String, required: true, unique: true, lowercase: true, trim: true},
		emailVerified: {type: Boolean, default: false},
		password: {type: String, required: true},
		firstName: {type: String, required: true},
		lastName: {type: String, required: true}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<IUser>('User', UserSchema);
