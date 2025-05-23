import { Router } from 'express';
import Paths from '../constants/paths';
import writeFileRouter from './writefile.controller';
import authRouter from './auth.controller';

const apiRouter = Router();

apiRouter.use(Paths.Write.Base, writeFileRouter);

apiRouter.use(Paths.Auth.Base, authRouter);

export default apiRouter;
