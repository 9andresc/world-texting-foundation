import Knex from 'knex'

import { Acronym } from 'db/interfaces/acronyms'
import { ResponseError } from 'helpers/errors'

type Params = {
  db: Knex
  params: {
    acronym: string
  }
}

async function getAcronym({ db, params }: Params): Promise<Acronym> {
  const acronym = await db
    .select('acronym', 'definitions')
    .from('acronyms')
    .where(db.raw('UPPER(acronym)'), '=', params.acronym.toUpperCase())
    .first()
  if (!acronym) {
    throw new ResponseError('Acronym not found.', 404)
  }
  return acronym
}

export default getAcronym
