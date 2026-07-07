import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUserSchema } from '../validations/authValidation.js';
import { loginUser, logoutUser } from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

router.post('/auth/logout', logoutUser);

export default router;
