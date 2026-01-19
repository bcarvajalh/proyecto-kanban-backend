import { Router } from 'express';
import { createProject, getProjects } from '../controllers/project.controller';
import { validateToken } from '../middlewares/login.middleware';

const router = Router();

router.use(validateToken);

router.get('/', getProjects);
router.post('/', createProject);

export default router;