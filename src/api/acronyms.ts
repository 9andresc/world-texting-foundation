import express, { NextFunction, Request, Response } from 'express';

import { connectToDB } from 'db';
import { generateLinks } from 'helpers/pagination';
import acronymsService from 'services/acronyms';

const router = express.Router();

const db = connectToDB();

router.get('/', async function getAcronyms(req: Request, res: Response, next: NextFunction) {
  const queryParams = {
    from: 0,
    limit: 10,
    search: '',
  };
  if (req.query.from) {
    queryParams.from = Number(req.query.from);
  }
  if (req.query.limit) {
    queryParams.limit = Number(req.query.limit);
  }
  if (req.query.search) {
    queryParams.search = String(req.query.search);
  }

  let acronyms;
  let total;
  try {
    ({ acronyms, total } = await acronymsService.getAcronyms({
      db,
      ...queryParams,
    }));
  } catch (error) {
    return next(error);
  }

  const links = generateLinks(req.baseUrl, queryParams.from, queryParams.limit, queryParams, total);

  res.set('Link', links);
  res.status(200);
  res.send({ acronyms });
});

export default router;
