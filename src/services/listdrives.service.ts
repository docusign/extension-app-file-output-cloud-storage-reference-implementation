import path from 'path';
import { ListDrivesBody, ListDrivesResponse } from '../models/writefile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';


export const listDrives = (req: IReq<ListDrivesBody>, res: IRes) => {

  
  try {
  const mockdata = [
      { containerId: 'drive-id-1', containerName: 'Shared Drive 1'},
      { containerId: 'drive-id-2', containerName: 'Shared Drive 2'},
      { containerId: 'drive-id-3', containerName: 'Shared Drive 3'},
    ];
  const listDrivesResult: ListDrivesResponse = { containerType: "drive", data: mockdata };
      return res.json(listDrivesResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};