import { Application } from 'express'
import request from 'supertest'

async function getPaginatedAcronyms(app: Application): Promise<void> {
  const response = await request(app).get('/acronym').query({ from: 5, limit: 5 })

  expect(response.status).toEqual(200)
  expect(response.body[0].acronym).toEqual('&lt;33')
  expect(response.body.length).toEqual(5)
}

export default getPaginatedAcronyms
