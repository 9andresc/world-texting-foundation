module.exports = {
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/src/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^db/(.*)$': '<rootDir>/src/db/$1',
    '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^scripts/(.*)$': '<rootDir>/src/scripts/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'node'
}
