// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const commonOptions = {
  client: 'sqlite3',
  migrations: {
    directory: [path.resolve(__dirname, 'migrations')]
  },
  seeds: {
    directory: [path.resolve(__dirname, 'seeds')]
  },
  useNullAsDefault: true
}

module.exports = {
  development: {
    ...commonOptions,
    connection: {
      filename: path.resolve(__dirname, 'wtf-dev.db')
    }
  },
  test: {
    ...commonOptions,
    connection: {
      filename: path.resolve(__dirname, 'wtf-test.db')
    }
  }
}
