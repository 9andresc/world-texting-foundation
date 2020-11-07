import getDefaultAcronyms from './getDefaultAcronyms'
import getMatchedAcronyms from './getMatchedAcronyms'
import getNotFoundAcronyms from './getNotFoundAcronyms'
import getPaginatedAcronyms from './getPaginatedAcronyms'

const getAcronymsTests = {
  default: getDefaultAcronyms,
  matched: getMatchedAcronyms,
  notFound: getNotFoundAcronyms,
  paginated: getPaginatedAcronyms
}

export default getAcronymsTests
