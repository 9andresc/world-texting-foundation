import * as dotenv from 'dotenv'
import { Application } from 'express'
import jwt from 'jsonwebtoken'
import request from 'supertest'

dotenv.config()

async function updateNotFoundAcronym(app: Application): Promise<void> {
  const token = jwt.sign({ user: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })

  const response = await request(app).put('/acronym/ghh').send({}).auth(token, { type: 'bearer' })

  expect(response.status).toEqual(404)
  expect(response.body).toEqual({ message: 'Acronym not found.' })
}

export default updateNotFoundAcronym
