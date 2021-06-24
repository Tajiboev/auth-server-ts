import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './api/routes/auth';
import projectRoutes from './api/routes/projects';
import compression from 'compression';
import { errorHandler, notFound } from './errorHandler';

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
app.use('/projects', projectRoutes);

//errors
app.use(notFound);
app.use(errorHandler);

export default app;
