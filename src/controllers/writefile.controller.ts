import { Router } from 'express';

import Paths from '../constants/paths';
import { writeFile } from '../services/writefile.service';
import { listDrives } from '../services/listdrives.service';
import {listDirectoryContents} from '../services/listdirectorycontents.service'
import {search} from '../services/search.service'
import { expressjwt as jwt } from 'express-jwt';
import { checkSchema } from 'express-validator';
import { writeFileBody, listDrivesBody, listDirectoryContentsBody, searchBody } from '../validationSchemas/writefile';
import checkValidationErrors from '../middleware/checkValidationErrors';
import env from '../env';

const writeFileRouter = Router();

writeFileRouter.post(
  Paths.Write.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(writeFileBody, ['body']),
  checkValidationErrors,
  writeFile,
);

writeFileRouter.post(
  Paths.ListDrives.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(listDrivesBody, ['body']),
  checkValidationErrors,
  listDrives,
);

writeFileRouter.post(
  Paths.ListDirectoryContents.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(listDirectoryContentsBody, ['body']),
  checkValidationErrors,
  listDirectoryContents,
);

writeFileRouter.post(
  Paths.Search.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(searchBody, ['body']),
  checkValidationErrors,
  search,
);

export default writeFileRouter;
