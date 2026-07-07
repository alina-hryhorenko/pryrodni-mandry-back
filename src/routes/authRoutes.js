import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUserSchema } from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);

export default router;
