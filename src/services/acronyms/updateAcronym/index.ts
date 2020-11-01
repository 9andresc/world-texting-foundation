import Knex from 'knex';

import { Acronym } from 'db/interfaces/acronyms';
import { ResponseError } from 'helpers/errors';

type Params = {
  db: Knex;
  params: {
    acronym: string;
  };
  data: {
    acronym: string;
    definitions: string[];
  };
};

async function updateAcronym({ db, params, data }: Params): Promise<Acronym> {
  const acronym: Acronym = await db
    .select()
    .from('acronyms')
    .where(db.raw('UPPER(acronym)'), '=', params.acronym.toUpperCase())
    .first();
  if (!acronym) {
    throw new ResponseError('Acronym not found.', 404);
  }

  await db('acronyms')
    .where({ id: acronym.id })
    .update({ acronym: data.acronym, definitions: JSON.stringify(data.definitions) });

  const updatedAcronym: Acronym = await db
    .select('acronym', 'definitions')
    .from('acronyms')
    .where({ id: acronym.id })
    .first();
  return updatedAcronym;
}

export default updateAcronym;
