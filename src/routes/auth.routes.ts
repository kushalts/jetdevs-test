import { Router, Request, Response } from 'express';
import { AuthController } from '../controller';
import authSchema from '../schema/auth.validate';

import { celebrate } from 'celebrate';
const router = Router({ mergeParams: true });

const authController = new AuthController();

router.post(
  '/register',
  celebrate(authSchema.SignupSchema),
  authController.register
);

router.post('/login', celebrate(authSchema.SigninSchema), authController.login);

export default router;
