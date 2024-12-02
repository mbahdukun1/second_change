import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();


router.post('/user/create', userController.createUser);
router.get('/user/getAllData', userController.getAllUsers); 
router.get('/user/:id', userController.getUserById); 
router.put('/user/:id', userController.updateUser);  
router.delete('/user/:id', userController.deleteUser); 
router.post('/user/login', userController.login)

export default router;
