import express from 'express';
const router = express.Router();

import methodError from '../utils/methodError';
import { addProject, listProjects } from '../controllers/projects';

import validateBody from '../middleware/validateBody';
import { projectSchema } from '../utils/validationSchemas';
import checkAuthentication from '../middleware/checkAuthentication';

router
	.route('/')
	.get(listProjects)
	.post(checkAuthentication, validateBody(projectSchema), addProject)
	.all(methodError({ allowed: ['GET', 'POST'] }));

export default router;
