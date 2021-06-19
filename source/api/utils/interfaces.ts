import { Date, Document } from 'mongoose';

interface IUser extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	projects: [IProject];
	propasals: [IProposal];
	contests: [IContest];
	entries: [IEntry];
}

interface IProject extends Document {
	title: string;
	description: string;
	budget: string;
	author: IUser;
	proposals: [IProposal];
	deadline: Date;
}

interface IProposal extends Document {
	author: IUser;
	message: string;
	title: string;
	price: string;
}

interface IContest extends Document {
	title: string;
	description: string;
	budget: string;
	author: IUser;
	entries: [IProposal];
	deadline: Date;
}

interface IEntry extends Document {
	author: IUser;
	description: string;
	title: string;
}

export { IUser, IProject, IContest, IProposal, IEntry };
