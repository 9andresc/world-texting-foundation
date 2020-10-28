module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './wtf.db',
    },
    migrations: {
      directory: ['./migrations'],
    },
    seeds: {
      directory: ['./seeds'],
    },
  },
};
