import { randomNumber } from 'helpers/index'
import { getRandomNonAdjacentItems } from 'services/misc/getRandomAcronyms/helpers'

const getRandomAcronymsTests = {
  random: (): void => {
    const items = ['a', 'b', 'c', 'd']
    const solutions = [
      ['a'],
      ['b'],
      ['c'],
      ['d'],
      ['a', 'c'],
      ['b', 'd'],
      ['c', 'a'],
      ['d', 'b'],
      ['a', 'd', 'b'],
      ['d', 'a', 'c'],
      ['b', 'd', 'a', 'c'],
      ['c', 'a', 'd', 'b']
    ]

    const isSolution = (item: unknown[]): boolean => {
      return solutions.some((s) => JSON.stringify(s) === JSON.stringify(item))
    }

    const count = randomNumber(1, 4)

    const result = getRandomNonAdjacentItems(items, count)

    expect(isSolution(result)).toBeTruthy()
  }
}

export default getRandomAcronymsTests
