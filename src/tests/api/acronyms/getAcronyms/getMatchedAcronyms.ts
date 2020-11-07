import { Application } from 'express'
import request from 'supertest'

const matchedAcronyms = [
  {
    acronym: 'ALOL',
    definitions: ['Actually laughing out loud']
  },
  {
    acronym: 'LOL',
    definitions: ['Laughing out loud']
  },
  {
    acronym: 'LOLH',
    definitions: ['Laughing out loud hysterically']
  },
  {
    acronym: 'LOLO',
    definitions: ['Lots of love']
  },
  {
    acronym: 'LOLWTF',
    definitions: ["Laughing out loud (saying) 'What the *freak*?'"]
  }
]

async function getMatchedAcronyms(app: Application): Promise<void> {
  const response = await request(app).get('/acronym').query({ search: 'lol' })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual(matchedAcronyms)
}

export default getMatchedAcronyms
