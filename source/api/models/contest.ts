import mongoose, { Schema } from 'mongoose';
import { IContest } from '../utils/interfaces';

const ContestSchema: Schema = new Schema(
	{
		title: String,
		description: String,
		budget: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		entries: [
			{
				type: Schema.Types.ObjectId,
				ref: 'entry'
			}
		]
	},
	{ strictQuery: true, timestamps: true }
);

export default mongoose.model<IContest>('contest', ContestSchema);
