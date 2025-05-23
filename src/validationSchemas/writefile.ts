import { Schema } from 'express-validator';

export const writeFileBody: Schema = {
  files: { isArray: { options: [{ min: 1 }] } },
  'files.*.basename': { trim: true, isString: true },
  'files.*.contents': { trim: true, isString: true },
  'files.*.path': { trim: true, isString: true },
  order: { isInt: true, optional: true },
  overwrite: { isBoolean: true, optional: true },
  parent: { isString: true, optional: true },
  metadata: { isObject: true, optional: true },
};
