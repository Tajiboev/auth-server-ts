import express, {NextFunction, Request, Response} from 'express';
import {connect} from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';

import userRoutes from './api/routes/user';
import authRoutes from './api/routes/auth';
import {GeneralError} from './utils/error';

const app = express();

// Connect DB
connect(config.mongo.url, config.mongo.options)
	.then((result) => {
		console.info('\n✅ Connected to the database\n');
	})
	.catch((error) => {
		console.error('\n❌ Could not connect to the database \n', error);
	});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
	const error = new GeneralError('Not found', 404);
	next(error);
});

app.use((error: GeneralError, req: Request, res: Response, next: NextFunction) => {
	console.error('❌ ', error);
	res.status(error.statusCode || 500).json({message: error.message});
});

export default app;
