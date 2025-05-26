import path from 'path';
import { SearchBody, SearchResponse } from '../models/writefile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';


export const search = (req: IReq<SearchBody>, res: IRes) => {

  
  try {
  const mockdata = [
      { type: 'file', name: 'TestFile1.pdf', id: 'testfile1Id', parentId: 'testfile1parentId', mimeType: 'application/pdf', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'TestFile2.pdf', id: 'testfile2Id', parentId: 'testfile2parentId', mimeType: 'application/pdf', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'TestFile3.pdf', id: 'testfile3Id', parentId: 'testfile3parentId', mimeType: 'application/pdf', lastModifiedDate: new Date().toISOString() },
    ];

  const searchResult: SearchResponse = { results: mockdata };
      return res.json(searchResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};