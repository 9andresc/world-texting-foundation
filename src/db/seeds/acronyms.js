// eslint-disable-next-line @typescript-eslint/no-var-requires
const acronyms = require('./acronyms.json');

const acronymsBatches = [];
/**
 * It recursively adds batches of no more than 499 acronyms to the acronymsBatches array.
 * Due to a limitation of the knex().insert function it cannot accept more than 499 entries.
 * @param {{ acronym: string; definitions: string[]}[]} acronyms
 * @param {number} startIndex
 */
function fillBatches(acronyms, startIndex) {
  if (acronyms.length === 0) {
    return;
  }

  acronymsBatches.push(
    acronyms.splice(startIndex, 499).map((a) => ({
      ...a,
      definitions: JSON.stringify(a.definitions),
    })),
  );
  fillBatches(acronyms, 0);
}

fillBatches(acronyms, 0);

exports.seed = function (knex) {
  return knex('acronyms')
    .del()
    .then(function () {
      const insertBatches = acronymsBatches.map((ab) => knex('acronyms').insert(ab));
      return Promise.all(insertBatches);
    })
    .catch((error) => {
      throw error;
    });
};
