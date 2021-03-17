import mongoose, {Schema, Document, ObjectId} from 'mongoose';

interface ICredentials extends Document {
	email: string;
	password: string;
	user: ObjectId;
}

const CredentialsSchema: Schema = new Schema(
	{
		email: {type: String, required: true, unique: true, lowercase: true, trim: true},
		password: {type: String, required: true},
		verified: {type: Boolean, default: false},
		user: {type: Schema.Types.ObjectId, ref: 'user', required: true}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<ICredentials>('credential', CredentialsSchema);
