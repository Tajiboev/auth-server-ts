import mongoose, {Schema, Document} from 'mongoose';

interface IUser extends Document {
	firstName: string;
	lastName: string;
}

const UserSchema: Schema = new Schema(
	{
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		credentials: {type: Schema.Types.ObjectId, ref: 'Credential'}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<IUser>('User', UserSchema);
