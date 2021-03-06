import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './errorHandler';

import authRoutes from './api/routes/auth';
import projectRoutes from './api/routes/projects';
import helmet from 'helmet';
import compression from 'compression';

const app = express();

app.disable('etag');
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

//errors
app.use(notFound);
app.use(errorHandler);

export default app;
