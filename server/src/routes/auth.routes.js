import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema, loginSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/signup', validate(signupSchema), authController.signup);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

export default router;
