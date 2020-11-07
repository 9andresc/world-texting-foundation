import { Application } from 'express'
import request from 'supertest'

const matchedAcronym = {
  acronym: 'LOL',
  definitions: ['Laughing out loud']
}

async function getMatchedAcronyms(app: Application): Promise<void> {
  const response = await request(app).get('/acronym/lol')

  expect(response.status).toEqual(200)
  expect(response.body).toEqual(matchedAcronym)
}

export default getMatchedAcronyms
