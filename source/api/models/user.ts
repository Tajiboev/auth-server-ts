import mongoose, {Schema, Document, ObjectId} from 'mongoose';

interface IUser extends Document {
	firstName: string;
	lastName: string;
	credentials: ObjectId;
}

const UserSchema: Schema = new Schema(
	{
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		credentials: {type: Schema.Types.ObjectId, ref: 'credential', required: true}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<IUser>('user', UserSchema);
