import { Date, Document } from 'mongoose';

interface IUser extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	projects: [IProject['_id']];
	propasals: [IProposal['_id']];
	contests: [IContest['_id']];
	entries: [IEntry['_id']];
}

interface IProject extends Document {
	title: string;
	description: string;
	budget: string;
	author: IUser['_id'];
	proposals: [IProposal];
	deadline: Date;
}

interface IProposal extends Document {
	author: IUser['_id'];
	message: string;
	title: string;
	price: string;
	project: IProject['_id'];
}

interface IContest extends Document {
	title: string;
	description: string;
	budget: string;
	author: IUser;
	entries: [IProposal['_id']];
	deadline: Date;
}

interface IEntry extends Document {
	author: IUser['_id'];
	title: string;
	description: string;
	contest: IContest['_id'];
}

export { IUser, IProject, IContest, IProposal, IEntry };
