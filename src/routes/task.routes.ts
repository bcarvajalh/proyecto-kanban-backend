import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask, updateTaskStatus } from '../controllers/task.controller';
import { validateToken } from '../middlewares/login.middleware';

const router = Router();

router.use(validateToken);
router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', updateTaskStatus);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask)

export default router;