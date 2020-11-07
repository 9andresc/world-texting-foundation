import app from '../../../app'
import db from '../../../db'

import getDefaultAcronyms from './getAcronyms/getDefaultAcronyms'
import getMatchedAcronyms from './getAcronyms/getMatchedAcronyms'
import getNotFoundAcronyms from './getAcronyms/getNotFoundAcronyms'
import getPaginatedAcronyms from './getAcronyms/getPaginatedAcronyms'

describe('Acronyms API', () => {
  beforeAll(async () => {
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async () => {
    await db.migrate.rollback()
    await db.destroy()
  })

  describe('Get Acronyms', () => {
    it('should return default acronyms', async () => {
      await getDefaultAcronyms(app)
    })

    it('should return matched acronyms', async () => {
      await getMatchedAcronyms(app)
    })

    it('should not return acronyms', async () => {
      await getNotFoundAcronyms(app)
    })

    it('should return paginated acronyms', async () => {
      await getPaginatedAcronyms(app)
    })
  })
})
