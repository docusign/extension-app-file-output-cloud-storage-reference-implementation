import path, { basename } from 'path';
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

function substringAfter(str: string, char: string): string {
  const index = str.indexOf(char);
  if (index === -1) {
    return ""; 
  }
  return str.substring(index + 1);
}


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
    
    const fullPathParts = fpath.split('/');
    const pathWithoutFile = fullPathParts.slice(0, fullPathParts.length - 1).join('/');
    const resolvedFileName = fullPathParts[fullPathParts.length - 1];
    fs.mkdirSync(pathWithoutFile, { recursive: true });
    fs.writeFileSync(path.join(pathWithoutFile, resolvedFileName), fileBuffer);
    const writeFileResult: WriteFileResponse = { message: 'Successfully wrote file' };
    return res.json(writeFileResult);
  } catch (err) {
    console.log(`Encountered an error writing file: ${err.message}`);
    const writeFileResult: WriteFileResponse = { message: 'Failed to write file' };
    return res.json(writeFileResult);
  }
};
