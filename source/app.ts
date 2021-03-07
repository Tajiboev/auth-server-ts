import express, {NextFunction, Request, Response} from 'express';
import {connect} from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
// import compression from 'compression';

import config from './config';

import userRoutes from './api/routes/user';
import ErrorWithStatusCode from './utils/ErrorWithStatusCode';

const app = express();

// Connect DB
connect(config.mongo.url, config.mongo.options)
	.then((result) => {
		console.info('✅ Connected to the database!');
	})
	.catch((error) => {
		console.info('❌ Could not connect to the database');
	});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
// app.use(compression());

app.use('/api/users', userRoutes);

app.use((req, res, next) => {
	const error = new ErrorWithStatusCode('Not found', 404);
	next(error);
});

app.use((error: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
	console.error('❌ ', error);
	res.status(error.statusCode || 500).json({error: error.message});
});

export default app;
