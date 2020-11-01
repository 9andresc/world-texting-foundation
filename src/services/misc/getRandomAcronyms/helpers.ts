import { Acronym } from 'db/interfaces/acronyms';
import { randomNumber } from 'helpers';

function getRandomAcronyms(acronyms: Acronym[], count: number): Acronym[] {
  const randomAcronyms = [];

  let indexes = acronyms.map((_a, i) => i);
  let randomIndex = randomNumber(0, indexes.length - 1);
  indexes = indexes.slice(0, randomIndex >= 0 ? randomIndex : 0).concat(indexes.slice(randomIndex + 1, indexes.length));

  randomAcronyms.push({ value: acronyms[randomIndex], index: randomIndex });

  let i = 1;
  while (i <= count) {
    let availableIndexes = indexes;
    let randomAvailableIndex = randomNumber(0, availableIndexes.length - 1);
    randomIndex = availableIndexes[randomAvailableIndex];

    const prevRandomIndex = randomAcronyms[randomAcronyms.length - 1].index;
    while (
      (randomIndex - 1 === prevRandomIndex || randomIndex + 1 === prevRandomIndex) &&
      availableIndexes.length > 0
    ) {
      availableIndexes = availableIndexes
        .slice(0, randomAvailableIndex >= 0 ? randomAvailableIndex : 0)
        .concat(availableIndexes.slice(randomAvailableIndex + 1, availableIndexes.length));
      randomAvailableIndex = randomNumber(0, availableIndexes.length - 1);
      randomIndex = availableIndexes[randomAvailableIndex];
    }

    if (availableIndexes.length === 0) {
      break;
    }

    randomAcronyms.push({ value: acronyms[randomIndex], index: randomIndex });

    indexes = indexes.filter((index) => index !== randomIndex);
    randomIndex = randomNumber(0, indexes.length - 1);

    i++;
  }

  return randomAcronyms.map((ra) => ra.value);
}

export default { getRandomAcronyms };
