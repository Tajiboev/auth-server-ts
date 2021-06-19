import mongoose, { Schema } from 'mongoose';
import { IEntry } from '../utils/interfaces';

const EntrySchema: Schema = new Schema(
	{
		title: String,
		description: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default mongoose.model<IEntry>('entry', EntrySchema);
