import app from '../../../app'
import db from '../../../db'

import getAcronymsTests from './getAcronyms/index'

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
      await getAcronymsTests.default(app)
    })

    it('should return matched acronyms', async () => {
      await getAcronymsTests.matched(app)
    })

    it('should not return acronyms', async () => {
      await getAcronymsTests.notFound(app)
    })

    it('should return paginated acronyms', async () => {
      await getAcronymsTests.paginated(app)
    })
  })
})
