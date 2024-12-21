import express, { Router } from 'express';

import Paths from '@src/common/Paths';

import userMw from './middleware/userMw';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import ComicsRoutes from './ComicsRoutes';
import googleAuthHandler from './middleware/googleAuth';

// **** Variables **** //

const apiRouter = Router();

// **** AuthRouter **** //

const authRouter = Router();
authRouter.post(Paths.Auth.Signup, AuthRoutes.signup as any);
authRouter.post(Paths.Auth.Login, AuthRoutes.login as any);
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout as any);
authRouter.post(Paths.Auth.VerifyEmail, AuthRoutes.verifyEmail as any);
authRouter.post(Paths.Auth.ResendEmail, AuthRoutes.resendEmail as any);
authRouter.post(
	Paths.Auth.googleSignup,
	googleAuthHandler as any,
	AuthRoutes.signupWithGoogle as any
);

authRouter.post(
	Paths.Auth.googleLogin,
	googleAuthHandler as any,
	AuthRoutes.loginWithGoogle as any
);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// **** Comics Routers **** //

// Unprotected comics router
const unprotectedComicRouter = Router();
unprotectedComicRouter.get(
	Paths.Comics.allComic,
	ComicsRoutes.allComics as any
);
unprotectedComicRouter.get(Paths.Comics.getComic, ComicsRoutes.getComic as any);
unprotectedComicRouter.post(
	Paths.Comics.getNestedComments,
	ComicsRoutes.getNestedComments as any
);

unprotectedComicRouter.post(
	Paths.Comics.getComments,
	ComicsRoutes.getComments as any
);

unprotectedComicRouter.get(
	Paths.Comics.marketPlaceComics,
	ComicsRoutes.allMarketPlaceComics as any
);

apiRouter.use(Paths.Comics.Base, unprotectedComicRouter);

// Protected comics router
const protectedComicRouter = Router();

protectedComicRouter.use(userMw as any);
protectedComicRouter.post(
	Paths.Comics.uploadComic,
	ComicsRoutes.uploadComic as any
);

protectedComicRouter.post(
	Paths.Comics.uploadToMarketPlace,
	ComicsRoutes.uploadComicToMarketPlace as any
);

protectedComicRouter.post(
	Paths.Comics.uploadComicAsPic,
	ComicsRoutes.uploadComicPicsToCloudinary as any
);

protectedComicRouter.post(
	Paths.Comics.uploadComicAsPdf,
	ComicsRoutes.uploadComicPdfsToCloudinary as any
);
protectedComicRouter.post(
	Paths.Comics.checkComic,
	ComicsRoutes.checkComic as any
);
protectedComicRouter.get(
	Paths.Comics.userComics,
	ComicsRoutes.userComics as any
);

protectedComicRouter.post(
	Paths.Comics.makeAComment,
	ComicsRoutes.makeAcomment as any
);

protectedComicRouter.post(
	Paths.Comics.likeAComic,
	ComicsRoutes.likeAComic as any
);

protectedComicRouter.post(
	Paths.Comics.likeAndUnlikeAcomment,
	ComicsRoutes.likeAndUnlikeAComment as any
);

protectedComicRouter.post(
	Paths.Comics.saveComic,
	ComicsRoutes.saveComic as any
);

protectedComicRouter.post(
	Paths.Comics.followComic,
	ComicsRoutes.followComic as any
);

// protectedComicRouter.post(
// 	Paths.Comics.getComicLikes,
// 	ComicsRoutes.getComicLikes as any
// );

protectedComicRouter.post(
	Paths.Comics.getComicSaved,
	ComicsRoutes.getSavedComics as any
);

protectedComicRouter.post(
	Paths.Comics.getComicFollowers,
	ComicsRoutes.getFollowers as any
);

protectedComicRouter.post(
	Paths.Comics.viewComic,
	ComicsRoutes.viewComic as any
);
// protectedComicRouter;
apiRouter.use(Paths.Comics.Base, protectedComicRouter);

// **** UserRouter **** //

const userRouter = Router();
userRouter.use(userMw as any);
userRouter.get(Paths.Users.Get, UserRoutes.getAll as any);
userRouter.put(Paths.Users.UpdateDetails, UserRoutes.updateUserDetails as any);
userRouter.get(
	Paths.Users.getComicsFileUrl,
	UserRoutes.getComicsFileUrl as any
);
userRouter.post(Paths.Users.uploadImage, UserRoutes.uploadImage as any);
userRouter.get(Paths.Users.getUser, UserRoutes.getUser as any);
userRouter.get(Paths.Users.metrics, ComicsRoutes.metrics as any);
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //
export default apiRouter;
