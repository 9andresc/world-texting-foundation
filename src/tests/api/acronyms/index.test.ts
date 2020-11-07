import app from '../../../app'
import db from '../../../db'

import createAcronymTests from './createAcronym'
import getAcronymTests from './getAcronym'
import getAcronymsTests from './getAcronyms'

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

  describe('Get Acronym', () => {
    it('should return a matched acronym', async () => {
      await getAcronymTests.matched(app)
    })

    it('should not return an acronym', async () => {
      await getAcronymTests.notFound(app)
    })
  })

  describe('Create Acronym', () => {
    it('should create an acronym', async () => {
      await createAcronymTests.create(app)
    })

    it('should not create a duplicated acronym', async () => {
      await createAcronymTests.duplicated(app)
    })
  })
})
