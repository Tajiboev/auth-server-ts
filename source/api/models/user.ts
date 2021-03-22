import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	isVerified: boolean;
	checkPassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			maxlength: [64, "Email can't be greater than 64 characters"],
			unique: true,
			index: true,
			lowercase: true
		},
		password: { type: String, required: true },
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			minlength: [2, "First name can't be smaller than 2 characters"],
			maxlength: [30, "First name can't be greater than 30 characters"]
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
			minlength: [2, "Last name can't be smaller than 2 characters"],
			maxlength: [30, "Last name can't be greater than 30 characters"]
		},
		isVerified: { type: Boolean, default: false }
	},
	{ strictQuery: true, timestamps: true }
);

UserSchema.pre('save', async function (this: IUser, next) {
	if (!this.isModified('password')) next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

UserSchema.method('checkPassword', async function (this: any, password: string): Promise<boolean> {
	const result = await bcrypt.compare(password, this.password);
	return result;
});

export default mongoose.model<IUser>('User', UserSchema);
