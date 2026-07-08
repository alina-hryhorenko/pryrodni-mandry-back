import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUserSchema } from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';
import { registerUser } from '../controllers/authController.js';

const router = Router();
router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post(
  '/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);

export default router;
