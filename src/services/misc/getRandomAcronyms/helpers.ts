import { randomNumber } from 'helpers';

function getRandomNonAdjacentItems(items: unknown[], count: number): unknown[] {
  const randomItems = [];

  let indexes = items.map((_i, i) => i);
  let randomIndex = randomNumber(0, indexes.length - 1);
  indexes = indexes.slice(0, randomIndex >= 0 ? randomIndex : 0).concat(indexes.slice(randomIndex + 1, indexes.length));

  randomItems.push({ value: items[randomIndex], index: randomIndex });

  let i = 1;
  while (i <= count) {
    let availableIndexes = indexes;
    let randomAvailableIndex = randomNumber(0, availableIndexes.length - 1);
    randomIndex = availableIndexes[randomAvailableIndex];

    const prevRandomIndex = randomItems[randomItems.length - 1].index;
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

    randomItems.push({ value: items[randomIndex], index: randomIndex });

    indexes = indexes.filter((index) => index !== randomIndex);
    randomIndex = randomNumber(0, indexes.length - 1);

    i++;
  }

  return randomItems.map((ra) => ra.value);
}

export { getRandomNonAdjacentItems };
