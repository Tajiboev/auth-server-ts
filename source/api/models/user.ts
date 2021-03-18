import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
	public: {firstName: string; lastName: string; email: string};
	private: {password: string; verified: boolean};
}

const UserSchema: Schema = new Schema(
	{
		public: {
			firstName: {type: String, required: true},
			lastName: {type: String, required: true},
			email: {type: String, required: true, unique: true, lowercase: true}
		},
		private: {
			password: {type: String, required: true},
			verified: {type: Boolean, default: false}
		}
	},
	{strictQuery: true, timestamps: true}
);

export default mongoose.model<IUser>('User', UserSchema);
