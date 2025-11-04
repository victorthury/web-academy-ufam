import { Router } from 'express';
import validate from '../../middlewares/validate';
import { loginSchema, signupSchema } from './auth.schema';
import authController from './auth.controller';

const router = Router();

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);
router.delete('/logout', authController.logout);

export default router;
