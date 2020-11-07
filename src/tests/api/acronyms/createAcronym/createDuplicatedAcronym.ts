import { Application } from 'express'
import request from 'supertest'

const duplicatedAcronym = {
  acronym: 'hf',
  definitions: ['Hi Fool']
}

async function createDuplicatedAcronym(app: Application): Promise<void> {
  const response = await request(app).post('/acronym').send(duplicatedAcronym)

  expect(response.status).toEqual(400)
  expect(response.body).toEqual({ message: 'Acronym already exists.' })
}

export default createDuplicatedAcronym
