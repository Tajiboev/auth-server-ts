import { Schema } from 'mongoose';

const proposalSchema: Schema = new Schema(
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

export default proposalSchema;
