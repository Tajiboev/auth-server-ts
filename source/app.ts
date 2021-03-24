import express, { NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError, { CreateHttpError, HttpError } from 'http-errors';

import config from './config';

import userRoutes from './api/routes/user';
import authRoutes from './api/routes/auth';
import compression from 'compression';

const app = express();

// Connect DB
connect(config.mongo.url, config.mongo.options)
	.then((result) => {
		console.info('\n✅ Connected to the database\n');
	})
	.catch((error) => {
		console.error('\n❌ Could not connect to the database \n', error);
	});

app.use(
	compression({
		level: 6,
		threshold: 1024,
		filter: (req, res) => {
			if (req.headers['x-no-compression']) {
				// don't compress responses with this request header
				return false;
			}
			// fallback to standard filter function
			return compression.filter(req, res);
		}
	})
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(async (req, res, next) => {
	next(new createHttpError.NotFound());
});

app.use(async (error: HttpError, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	res.status(error.statusCode || 500).json({
		error: {
			statusCode: error.statusCode,
			message: error.message
		}
	});
});

export default app;
