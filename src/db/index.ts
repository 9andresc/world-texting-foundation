import Knex from 'knex'
import knex from 'knex'

import knexConfig from './knexfile'

let connection: Knex

function connectToDB(): Knex {
  if (connection) {
    console.log('Cached connection.')
    return connection
  }

  connection = knex(knexConfig.development)
  return connection
}

export { connectToDB }
