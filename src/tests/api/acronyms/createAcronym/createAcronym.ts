import { Application } from 'express'
import request from 'supertest'

const createdAcronym = {
  acronym: 'hff',
  definitions: ['Have Fun Fools']
}

async function createAcronym(app: Application): Promise<void> {
  let response = await request(app).post('/acronym').send(createdAcronym)

  expect(response.status).toEqual(201)
  expect(response.body).toEqual(createdAcronym)

  response = await request(app).get('/acronym/hff')

  expect(response.status).toEqual(200)
  expect(response.body).toEqual(createdAcronym)
}

export default createAcronym
