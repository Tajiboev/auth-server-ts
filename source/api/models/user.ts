import mongoose, { Schema } from 'mongoose';
import { IUser } from '../utils/interfaces';

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
		projects: [
			{
				type: Schema.Types.ObjectId,
				ref: 'project'
			}
		],
		contests: [
			{
				type: Schema.Types.ObjectId,
				ref: 'contest'
			}
		],
		proposals: [
			{
				type: Schema.Types.ObjectId,
				ref: 'proposal'
			}
		],
		entries: [
			{
				type: Schema.Types.ObjectId,
				ref: 'entry'
			}
		]
	},
	{ strictQuery: true, timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
