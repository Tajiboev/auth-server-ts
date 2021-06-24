import { model, Schema } from 'mongoose';
import { IProject } from '../utils/interfaces';

const ProjectSchema: Schema = new Schema(
	{
		title: String,
		description: String,
		budget: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		proposals: [
			{
				type: Schema.Types.ObjectId,
				ref: 'proposal'
			}
		]
	},
	{ strictQuery: true, timestamps: true }
);

ProjectSchema.methods.addProposal = function (this: any, proposal) {
	this.proposals.push(proposal);
};

export default model<IProject>('project', ProjectSchema);
