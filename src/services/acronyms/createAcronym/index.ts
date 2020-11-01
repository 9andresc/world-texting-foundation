import Knex from 'knex';

import { Acronym } from 'db/interfaces/acronyms';
import { ResponseError } from 'helpers/errors';

type Params = {
  db: Knex;
  data: {
    acronym: string;
    definitions: string[];
  };
};

async function createAcronym({ db, data }: Params): Promise<Acronym> {
  const duplicatedAcronym: Acronym = await db
    .select()
    .from('acronyms')
    .where(db.raw('UPPER(acronym)'), '=', data.acronym.toUpperCase())
    .first();
  if (duplicatedAcronym) {
    throw new ResponseError('Acronym already exists.', 400);
  }

  const [acronymId] = await db.insert({ ...data, definitions: JSON.stringify(data.definitions) }).into('acronyms');

  const createdAcronym: Acronym = await db
    .select('acronym', 'definitions')
    .from('acronyms')
    .where({ id: acronymId })
    .first();
  return createdAcronym;
}

export default createAcronym;
