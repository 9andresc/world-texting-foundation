import Knex from 'knex';

import { Acronym } from 'db/interfaces/acronyms';

type Params = {
  db: Knex;
  from?: number;
  limit?: number;
  search?: string;
};

async function getAcronyms({ db, from, limit, search }: Params): Promise<{ acronyms: Acronym[]; total: number }> {
  const getAcronyms = db
    .select('acronym', 'definitions')
    .from('acronyms')
    .where(db.raw('UPPER(acronym)'), 'like', `%${search}%`.toUpperCase())
    .offset(from)
    .limit(limit);
  const countAcronyms = db('acronyms')
    .count('id as count')
    .where(db.raw('UPPER(acronym)'), 'like', `%${search}%`.toUpperCase());
  const [acronyms, total] = await Promise.all([getAcronyms, countAcronyms]);
  return {
    acronyms,
    total: Number(total[0].count),
  };
}

export default getAcronyms;
