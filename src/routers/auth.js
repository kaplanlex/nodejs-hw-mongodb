import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController } from '../controllers/auth.js';
import { validBody } from '../middlewares/validBody.js';

const router = Router();
router.post(
  '/register',
  validBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
export default router;