import path from 'path';
import { WriteFileBody, WriteFileResponse } from '../models/writefile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';
import sanitize from 'sanitize-filename';

export const writeFile = (req: IReq<WriteFileBody>, res: IRes) => {
  const {
    body: {
      files: [file],
    },
  } = req;
  const fileBuffer = Buffer.from(file.contents, 'base64');


  try {
        const regexp = new RegExp('{{(.*?)}}', 'g');
        let fpath = file.path;
        if (file.pathTemplateValues) {
          const matchedValues = [...fpath.matchAll(regexp)];
          const replacementValues = file.pathTemplateValues;
          matchedValues.forEach((matched, index) => {
            const toBeReplaced = matched[0];
            fpath = fpath.replace(toBeReplaced, sanitize(replacementValues[index], { replacement: '_' }));
          });
        }
    
    // Confine every write to a fixed base directory. Resolving the
    // (attacker-controlled) request path against the base and verifying the
    // relative path from the base does not escape it prevents absolute-path
    // and `..` traversal writes outside the intended folder (arbitrary file
    // write / RCE).
    const baseDir = path.resolve('testfolder');
    const dest = path.resolve(baseDir, fpath);
    const relativePath = path.relative(baseDir, dest);
    if (relativePath === '' || relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      throw new Error(`Invalid file path: '${fpath}' resolves outside of the allowed directory`);
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, fileBuffer);
    const writeFileResult: WriteFileResponse = { message: 'Successfully wrote file' };
    return res.json(writeFileResult);
  } catch (err) {
    console.log(`Encountered an error writing file: ${err.message}`);
    const writeFileResult: WriteFileResponse = { message: 'Failed to write file' };
    return res.json(writeFileResult);
  }
};
