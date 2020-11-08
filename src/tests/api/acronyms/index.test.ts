import app from '../../../app'
import db from '../../../db'

import createAcronymTests from './createAcronym'
import deleteAcronymTests from './deleteAcronym'
import getAcronymTests from './getAcronym'
import getAcronymsTests from './getAcronyms'
import updateAcronymTests from './updateAcronym'

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

  describe('Update Acronym', () => {
    it('should update a matched acronym', async () => {
      await updateAcronymTests.matched(app)
    })

    it('should not update an acronym', async () => {
      await updateAcronymTests.notFound(app)
    })
  })

  describe('Delete Acronym', () => {
    it('should delete a matched acronym', async () => {
      await deleteAcronymTests.matched(app)
    })

    it('should not delete an acronym', async () => {
      await deleteAcronymTests.notFound(app)
    })
  })
})
