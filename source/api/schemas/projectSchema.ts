import { Schema, HookNextFunction } from 'mongoose';
import { IProposalDocument } from '../interfaces/proposal';
import User from '../models/userModel';

const projectSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		budget: {
			type: String,
			required: true
		},
		deadline: {
			type: Date,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
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

projectSchema.post('save', async function (this: IProposalDocument, next: HookNextFunction) {
	User.updateOne({ _id: this.author }, { $addToSet: { projects: [this._id] } })
		.exec()
		.catch(next);

	return next();
});

projectSchema.post('remove', async function (this: IProposalDocument, next: HookNextFunction) {
	User.updateOne({ _id: this.author }, { $pull: { projects: [this._id] } })
		.exec()
		.catch(next);

	return next();
});

export default projectSchema;
