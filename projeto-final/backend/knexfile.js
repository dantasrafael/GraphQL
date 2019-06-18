require('dotenv').config()

module.exports = {
  client: process.env.APP_DB_CLIENT,
  connection: {
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_DATABASE,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASS,
    ssl: true
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
