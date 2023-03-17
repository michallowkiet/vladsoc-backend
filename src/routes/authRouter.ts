import { Router } from 'express';
import { signIn } from '../controllers/authController.js';

const authRouter = Router();

authRouter.route('/login').post(signIn);

export default authRouter;
