import getRandomAcronymsTests from './getRandomAcronyms'

describe('Misc Service', () => {
  describe('Get Random Acronyms', () => {
    it('should return random not adjacent acronyms', () => {
      getRandomAcronymsTests.random()
    })
  })
})
