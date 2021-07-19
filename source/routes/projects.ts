import express from 'express';
const router = express.Router();

import methodError from '../utils/methodError';
import { addProject, deleteProject, listProjects, oneProject, updateProject } from '../controllers/projects';

import validateBody from '../middleware/validateBody';
import { projectSchema, projectUpdateSchema } from '../utils/validationSchemas';
import checkAuthentication from '../middleware/checkAuthentication';

router
	.route('/')
	.get(listProjects)
	.post(checkAuthentication, validateBody(projectSchema), addProject)
	.all(methodError({ allowed: ['GET', 'POST'] }));

router
	.route('/:id')
	.get(oneProject)
	.delete(checkAuthentication, deleteProject)
	.patch(checkAuthentication, validateBody(projectUpdateSchema), updateProject)
	.all(methodError({ allowed: ['GET', 'DELETE'] }));

export default router;
