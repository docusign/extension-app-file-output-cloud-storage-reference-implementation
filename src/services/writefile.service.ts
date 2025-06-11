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
    if (file.path) {
      fs.mkdirSync(file.path, { recursive: true });
    }
        const mappedPathsToFolderId = new Map<string, string>();
        const regexp = new RegExp('{{(.*?)}}', 'g');
        if (file.pathTemplateValues) {
          const matchedValues = [...file.basename.matchAll(regexp)];
          const replacementValues = file.pathTemplateValues;
          matchedValues.forEach((matched, index) => {
            const toBeReplaced = matched[0];
            const identifierRemoved = substringAfter(replacementValues[index], '_');
            file.basename = file.basename.replace(toBeReplaced, sanitize(identifierRemoved, { replacement: '_' }));
          });
        }
    
    
    fs.writeFileSync(path.join(file.path, file.basename), fileBuffer);
    const writeFileResult: WriteFileResponse = { message: 'Successfully wrote file' };
    return res.json(writeFileResult);
  } catch (err) {
    console.log(`Encountered an error writing file: ${err.message}`);
    const writeFileResult: WriteFileResponse = { message: 'Failed to write file' };
    return res.json(writeFileResult);
  }
};
