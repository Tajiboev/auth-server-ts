import mongoose, { Schema, Document } from 'mongoose';

export interface IBlacklistedToken extends Document {
	token: string;
}

const BlacklistedToken: Schema = new Schema(
	{
		token: {
			type: String,
			required: true,
			unique: true,
			index: true
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default mongoose.model<IBlacklistedToken>('blacklistedtoken', BlacklistedToken);
