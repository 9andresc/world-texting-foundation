import * as dotenv from 'dotenv'
import { Application } from 'express'
import jwt from 'jsonwebtoken'
import request from 'supertest'

dotenv.config()

async function deleteMatchedAcronym(app: Application): Promise<void> {
  const token = jwt.sign({ user: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })

  let response = await request(app).delete('/acronym/gh').auth(token, { type: 'bearer' })

  expect(response.status).toEqual(204)

  response = await request(app).get('/acronym/gh')
  expect(response.status).toEqual(404)
  expect(response.body).toEqual({ message: 'Acronym not found.' })
}

export default deleteMatchedAcronym
