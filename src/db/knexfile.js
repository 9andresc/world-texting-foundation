// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'wtf.db')
    },
    migrations: {
      directory: ['./migrations']
    },
    seeds: {
      directory: ['./seeds']
    },
    useNullAsDefault: true
  }
}
