import Knex from 'knex';

import { Acronym } from 'db/interfaces/acronyms';
import { ResponseError } from 'helpers/errors';

type Params = {
  db: Knex;
  acronymValue: string;
};

async function getAcronym({ db, acronymValue }: Params): Promise<Acronym> {
  const acronym = await db
    .select('acronym', 'definitions')
    .from('acronyms')
    .where({
      acronym: acronymValue,
    })
    .first();
  if (!acronym) {
    throw new ResponseError('Acronym not found.', 404);
  }
  return acronym;
}

export default getAcronym;
