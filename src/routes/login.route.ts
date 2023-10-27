import { Router } from 'express';
import loginController from '../controllers/login.controller';
import checkLoginBody from '../middlewares/checkLoginBody.middleware';

const router = Router();

router.post('/', checkLoginBody, loginController.login);

export default router;