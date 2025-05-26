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

export const listDrivesBody: Schema = {
  containerType: {isString: true},
  sort: {isArray: { options: [{ min: 1 }] }},
  'sort.*.sortKey': { trim: true, isString: true },
  'sort.*.sortOrder': { trim: true, isString: true },
  limit: { isInt: true, optional: true },
  parentId: { isString: true, optional: true },
  metadata: { isObject: true, optional: true },
};

export const listDirectoryContentsBody: Schema = {
  parentId: {isString: true},
  sort: {isArray: { options: [{ min: 1 }] }},
  'sort.*.sortKey': { trim: true, isString: true },
  'sort.*.sortOrder': { trim: true, isString: true },
  limit: { isInt: true, optional: true },
  //filterOptions: {isObject: true, optional: true},
  //'filterOptions.*.allowedMimetypes': {isArray: { options: [{ min: 1 }] }},
  //'filterOptions.*.maxFileSizeInBytes': { trim: true, isInt: true },
  metadata: { isObject: true, optional: true },
};

export const searchBody: Schema = {
  searchQuery: {isString: true},
  parentId: {isString: true, optional: true},
  sort: {isArray: { options: [{ min: 1 }] }},
  'sort.*.sortKey': { trim: true, isString: true },
  'sort.*.sortOrder': { trim: true, isString: true },
  limit: { isInt: true, optional: true },
  metadata: { isObject: true, optional: true },
};