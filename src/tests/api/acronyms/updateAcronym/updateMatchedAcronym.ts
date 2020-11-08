import * as dotenv from 'dotenv'
import { Application } from 'express'
import jwt from 'jsonwebtoken'
import request from 'supertest'

dotenv.config()

const updatedAcronym = {
  acronym: 'gh',
  definitions: ['Good Half']
}

async function updateMatchedAcronym(app: Application): Promise<void> {
  const token = jwt.sign({ user: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })

  let response = await request(app).put('/acronym/gh').send(updatedAcronym).auth(token, { type: 'bearer' })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual(updatedAcronym)

  response = await request(app).get('/acronym/gh')
  expect(response.status).toEqual(200)
  expect(response.body).toEqual(updatedAcronym)
}

export default updateMatchedAcronym
