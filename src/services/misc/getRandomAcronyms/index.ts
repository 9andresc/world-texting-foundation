import Knex from 'knex';

import { Acronym } from 'db/interfaces/acronyms';
import { ResponseError } from 'helpers/errors';

import { getRandomNonAdjacentItems } from './helpers';

type Params = {
  db: Knex;
  count: number;
};

async function getRandomAcronyms({ db, count }: Params): Promise<Acronym[]> {
  const getAcronyms = db.select('acronym', 'definitions').from('acronyms');
  const countAcronyms = db('acronyms').count('id as count').first();
  const [acronyms, total] = await Promise.all([getAcronyms, countAcronyms]);

  if (count > Number(total.count)) {
    throw new ResponseError(`'count' can't be greater than ${total.count}.`, 400);
  }

  const randomAcronyms = getRandomNonAdjacentItems(acronyms, count) as Acronym[];

  return randomAcronyms;
}

export default getRandomAcronyms;
