import express, { Router } from 'express';

import Paths from '@src/common/Paths';

import adminMw from './middleware/userMw';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';

// **** Variables **** //

const apiRouter = Router();

// **** AuthRouter **** //

const authRouter = Router();

authRouter.use(Paths.Auth.Base, authRouter);

// Routes
authRouter.post(Paths.Auth.Signup, AuthRoutes.signup as any);
authRouter.post(Paths.Auth.Login, AuthRoutes.login as any);
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout as any);
authRouter.post(Paths.Auth.VerifyEmail, AuthRoutes.verifyEmail as any);
authRouter.post(Paths.Auth.ResendEmail, AuthRoutes.resendEmail as any);

// Add AuthRouter

apiRouter.use(Paths.Auth.Base, authRouter);

// **** UserRouter **** //

const userRouter = Router();

apiRouter.use(Paths.Users.Base, adminMw as any, userRouter);
apiRouter.use(express.json({ limit: '50mb' }));

// User Routes
userRouter.get(Paths.Users.Get, UserRoutes.getAll as any);
// userRouter.post(Paths.Users.Add, UserRoutes.add as any);
// userRouter.put(Paths.Users.Update, UserRoutes.update as any);
// userRouter.delete(Paths.Users.Delete, UserRoutes.delete as any);
userRouter.put(Paths.Users.UpdateDetails, UserRoutes.updateUserDetails as any);
userRouter.get(
  Paths.Users.getComicsFileUrl,
  UserRoutes.getComicsFileUrl as any
);
userRouter.post(Paths.Users.uploadImage, UserRoutes.uploadImage as any);
userRouter.get(Paths.Users.getUser, UserRoutes.getUser as any);

// Add UserRouter

// **** Export default **** //

export default apiRouter;
