const config = require('config');
const {
  database,
  user,
  password,
  options: { host, dialect, seederStorage },
} = config.get('dbConfig');

const base = {
  username: user,
  password,
  database,
  host,
  dialect,
  seederStorage,
};

module.exports = {
  development: base,
  stage: base,
  production: base,
};
