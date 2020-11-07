import Knex from 'knex'
import knex from 'knex'

import knexConfig from './knexfile'

let db: Knex = null

if (process.env.NODE_ENV === 'test') {
  db = knex(knexConfig.test)
} else {
  db = knex(knexConfig.development)
}

export default db
