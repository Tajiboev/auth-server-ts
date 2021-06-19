import mongoose, { Schema } from 'mongoose';
import { IProposal } from '../utils/interfaces';

const ProposalSchema: Schema = new Schema(
	{
		price: String,
		message: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: 'project'
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default mongoose.model<IProposal>('proposal', ProposalSchema);
