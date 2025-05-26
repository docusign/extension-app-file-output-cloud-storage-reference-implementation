import path from 'path';
import { ListDirectoryContentsBody, ListDirectoryContentsResponse } from '../models/writefile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';


export const listDirectoryContents = (req: IReq<ListDirectoryContentsBody>, res: IRes) => {

  
  try {
  const mockdata = [
      { type: 'folder', name: 'Folder 1', id: 'folder-id-1', parentId: '1' },
      { type: 'file', name: 'file-id-1.jpeg', id: 'image-1', parentId: '1', mimeType: 'image/jpeg', lastModifiedDate: '2023-10-01T00:00:00Z' },
    ];

  const listDirectoryContentsResult: ListDirectoryContentsResponse = { parentId: "12345", data: mockdata };
      return res.json(listDirectoryContentsResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};