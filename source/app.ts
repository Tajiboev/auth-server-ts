import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError, { HttpError } from 'http-errors';

import authRoutes from './api/routes/auth';
import compression from 'compression';

const app = express();

// Connect DB
import('./connectDB');

app.use(
	compression({
		level: 6,
		threshold: 1024,
		filter: (req, res) => {
			if (req.headers['x-no-compression']) return false;
			return compression.filter(req, res);
		}
	})
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);

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
