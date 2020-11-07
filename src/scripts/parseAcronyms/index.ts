import fs from 'fs'

import originalAcronyms from './orginalAcronyms.json'

const parsedAcronyms: { acronym: string; definitions: string[] }[] = []

originalAcronyms.forEach((acronym: { string: string }) => {
  // Find acronym index in parsedAcronyms
  const acronymIndex = parsedAcronyms.findIndex((a) => a.acronym === Object.keys(acronym)[0])
  if (acronymIndex === -1) {
    parsedAcronyms.push({
      acronym: Object.keys(acronym)[0],
      definitions: [Object.values(acronym)[0]]
    })
  } else {
    parsedAcronyms[acronymIndex].definitions = [...parsedAcronyms[acronymIndex].definitions, Object.values(acronym)[0]]
  }
})

const acronymsJSON = JSON.stringify(parsedAcronyms)
fs.writeFileSync('./src/db/seeds/acronyms.json', acronymsJSON)
