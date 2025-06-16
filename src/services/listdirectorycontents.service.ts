import path from 'path';
import { ListDirectoryContentsBody, ListDirectoryContentsResponse } from '../models/writefile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';
import { listDirectoryContentsBody } from 'src/validationSchemas/writefile';


export const listDirectoryContents = (req: IReq<ListDirectoryContentsBody>, res: IRes) => {
     const {
     body: {
      parentId: reqParentId,
    },
  } = req;
  
  try {
  const mockdata = [
      { type: 'folder', name: 'Folder 1', id: 'folder-id-1', parentId: reqParentId },
      { type: 'folder', name: 'Folder 2', id: 'folder-id-2', parentId: reqParentId },
    ];

  const listDirectoryContentsResult: ListDirectoryContentsResponse = { parentId: reqParentId, data: mockdata };
      return res.json(listDirectoryContentsResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};