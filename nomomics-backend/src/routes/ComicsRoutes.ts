import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReq, IRes } from './common/types';
import check from './common/check';
import { ObjectId } from 'mongoose';
import ComicsService from '@src/services/ComicsService';

/** Get Comics file Url */
async function getComicsFileUrl(req: IReq, res: IRes) {
  const [base64File] = check.isStr(req.body, ['base64File']);
  const comicsUrl = await ComicsService.getComicsFileUrl(
    req.body.id as ObjectId,
    base64File
  );
  return res
    .status(HttpStatusCodes.OK)
    .json({ success: true, data: { comicsUrl } });
}

// **** Functions **** //

export default {
  getComicsFileUrl,
} as const;
