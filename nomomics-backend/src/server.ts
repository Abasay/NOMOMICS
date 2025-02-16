/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from '@src/routes';

import Paths from '@src/common/Paths';
import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { NodeEnvs } from '@src/common/misc';
import { RouteError } from '@src/common/classes';
import { IReq, IRes } from './routes/common/types';
import cors from 'cors';
import connectDB from './configs/db.config';
import startCronJobs from './cron-jobs/index';

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Set a reasonable limit for JSON and URL-encoded payloads
app.use(express.json({ limit: '50mb' }));
app.use(
	express.urlencoded({
		extended: false,
		limit: '50mb',
		parameterLimit: 1000000,
	})
);

app.use(cookieParser(EnvVars.CookieProps.Secret));
app.use(cors());

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
	app.use(morgan('dev'));
}
connectDB();
startCronJobs();

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
	app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use(
	(
		err: Error,
		_: Request,
		res: Response,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		next: NextFunction
	): any => {
		if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
			logger.err(err, true);
		}
		let status = HttpStatusCodes.BAD_REQUEST;
		let additionalMessage;
		if (err instanceof RouteError) {
			status = err.status;
			additionalMessage = err.message2;
		}
		return res
			.status(status)
			.json({ error: err.message, additionalMessage });
	}
);

// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to login pg by default
app.get('/', (_: Request, res: Response) => {
	res.sendFile('login.html', { root: viewsDir });
});

// Redirect to login if not logged in.
// app.get('/users', (req: IReq, res: IRes) => {
//   const jwt = req.signedCookies[EnvVars.CookieProps.Key];
//   if (!jwt) {
//     res.redirect('/');
//   } else {
//     res.sendFile('users.html', { root: viewsDir });
//   }
// });

// **** Export default **** //

export default app;
