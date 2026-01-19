import { Router } from 'express';
import { createUserController, deleteUser, getAllUsers, loginController } from '../controllers/user.controller';
import { validateToken } from '../middlewares/login.middleware';

const router = Router();

router.post('/login', loginController);
router.post('/register', createUserController);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);


export default router;