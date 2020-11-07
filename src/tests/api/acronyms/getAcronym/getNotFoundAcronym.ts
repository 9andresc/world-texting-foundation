import { Application } from 'express'
import request from 'supertest'

async function getNotFoundAcronym(app: Application): Promise<void> {
  const response = await request(app).get('/acronym/L9dxaAt1c9')

  expect(response.status).toEqual(404)
  expect(response.body).toEqual({ message: 'Acronym not found.' })
}

export default getNotFoundAcronym
