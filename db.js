const pgp = require('pg-promise')({ promiseLib: Promise });

const config = {
  port: 5432,
  host: 'localhost',
  database: 'db_access_pong'
};
const db = pgp(config);

module.exports = db;
