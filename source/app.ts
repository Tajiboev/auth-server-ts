import express, {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import ErrorWithStatusCode from './utils/ErrorWithStatusCode';
import logger from './utils/Logger';
import config from './config';

import userRoutes from './api/routes/user';

const app = express();

// Connect DB
console.log(config.mongo.url);
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then((result) => {
		logger.info('app.ts', '✅ Connected to the database!');
	})
	.catch((error) => {
		logger.error('app.ts', '❌ Could not connect to the database');
	});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.use((req, res, next) => {
	const error = new ErrorWithStatusCode('Not found', 404);
	res.status(error.statusCode).json({message: error.message});
	next(error);
});

app.use((error: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
	// logger.error('Error handler', error.message, error);
	res.status(error.statusCode || 500).json({message: error.message});
});

export default app;
