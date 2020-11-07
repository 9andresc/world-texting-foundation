import { Application } from 'express'
import request from 'supertest'

const defaultAcronyms = [
  {
    acronym: '?',
    definitions: ["I don't understand what you mean"]
  },
  {
    acronym: '?4U',
    definitions: ['I have a question for you']
  },
  {
    acronym: ';S',
    definitions: ["Gentle warning, like 'Hmm? What did you say?'"]
  },
  {
    acronym: '^^',
    definitions: ["Meaning 'read line' or 'read message' above"]
  },
  {
    acronym: '&lt;3',
    definitions: ["Meaning 'sideways heart' (love, friendship)"]
  },
  {
    acronym: '&lt;33',
    definitions: ["Meaning 'heart or love' (more 3s is a bigger heart)"]
  },
  {
    acronym: '@TEOTD',
    definitions: ['At the end of the day']
  },
  {
    acronym: '.02',
    definitions: ['My (or your) two cents worth']
  },
  {
    acronym: '1TG, 2TG',
    definitions: ['Meaning number of items needed for win (online gaming)']
  },
  {
    acronym: '1UP',
    definitions: ['Meaning extra life (online gaming)']
  }
]

async function getDefaultAcronyms(app: Application): Promise<void> {
  const response = await request(app).get('/acronym')

  expect(response.status).toEqual(200)
  expect(response.body).toEqual(defaultAcronyms)
}

export default getDefaultAcronyms
