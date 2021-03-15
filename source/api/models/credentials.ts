import mongoose, {Schema, Document} from 'mongoose';

interface ICredentials extends Document {
	email: string;
	password: string;
}

const CredentialsSchema: Schema = new Schema(
	{
		email: {type: String, required: true, unique: true, lowercase: true, trim: true},
		password: {type: String, required: true},
		user: {type: Schema.Types.ObjectId, ref: 'User'}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<ICredentials>('Credential', CredentialsSchema);
