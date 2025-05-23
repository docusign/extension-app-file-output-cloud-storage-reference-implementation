import path from 'path';
import { WriteFileBody, WriteFileResponse } from '../models/writefile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';

export const writeFile = (req: IReq<WriteFileBody>, res: IRes) => {
  const {
    body: {
      files: [file],
    },
  } = req;
  const fileBuffer = Buffer.from(file.contents, 'base64');
  try {
    if (file.path) {
      fs.mkdirSync(file.path, { recursive: true });
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
