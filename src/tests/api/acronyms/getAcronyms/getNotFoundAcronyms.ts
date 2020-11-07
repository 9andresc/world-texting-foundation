import { Application } from 'express'
import request from 'supertest'

async function getNotFoundAcronyms(app: Application): Promise<void> {
  const response = await request(app).get('/acronym').query({ search: 'L9dxaAt1c9' })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual([])
}

export default getNotFoundAcronyms
