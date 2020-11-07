import Knex from 'knex'

import { Acronym } from 'db/interfaces/acronyms'
import { ResponseError } from 'helpers/errors'

type Params = {
  db: Knex
  params: {
    acronym: string
  }
}

async function deleteAcronym({ db, params }: Params): Promise<Acronym> {
  const acronym: Acronym = await db
    .select('acronym', 'definitions')
    .from('acronyms')
    .where(db.raw('UPPER(acronym)'), '=', params.acronym.toUpperCase())
    .first()
  if (!acronym) {
    throw new ResponseError('Acronym not found.', 404)
  }

  await db('acronyms').where({ acronym: acronym.acronym }).del()

  const deletedAcronym = acronym
  return deletedAcronym
}

export default deleteAcronym
