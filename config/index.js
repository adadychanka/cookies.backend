// const config = require("config");
// const {
//   database,
//   user,
//   password,
//   options: { host, dialect, seederStorage },
// } = config.get("dbConfig");
//
// const base = {
//   username: user,
//   password,
//   database,
//   host,
//   dialect,
//   seederStorage,
// };

const db = (() => {
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const options = {
    host: process.env.DB_HOST,
    dialect: "postgres",
    seederStorage: "sequelize",
  };

  return {
    database,
    user,
    password,
    options,
  };
})();

const eth = (() => {
  const providerUrl = process.env.ETH_PROVIDER_URL;

  return {
    providerUrl,
  };
})();

module.exports = {
  // development: base,
  // stage: base,
  // production: base,
  db,
  eth,
};
