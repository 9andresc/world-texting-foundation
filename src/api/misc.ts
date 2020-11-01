import express, { NextFunction, Request, Response } from 'express';

import { connectToDB } from 'db';
import { Acronym } from 'db/interfaces/acronyms';
import miscService from 'services/misc';

const router = express.Router();

const db = connectToDB();

router.get('/random/:count', async function getRandomAcronyms(req: Request, res: Response, next: NextFunction) {
  let randomAcronyms: Acronym[];
  try {
    randomAcronyms = await miscService.getRandomAcronyms({ db, count: Number(req.params.count) });
  } catch (error) {
    return next(error);
  }

  res.status(200);
  res.send(randomAcronyms.map((ra) => ({ ...ra, definitions: JSON.parse(String(ra.definitions)) })));
});

export default router;
