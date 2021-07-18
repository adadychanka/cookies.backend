const { isDevelopment } = require("./environment");

const db = (() => {
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  let options = {
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    dialect: "postgres",
    seederStorage: "sequelize",
  };

  if (!isDevelopment()) {
    // To connect to remote DB
    const extraOptions = {
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };

    options = {
      ...options,
      ...extraOptions,
    };
  }

  return {
    database,
    user,
    password,
    options,
  };
})();

const eth = (() => {
  const providerUrl = process.env.ETH_PROVIDER_URL;
  const wsProviderUrl = process.env.ETH_WS_PROVIDER_URL;

  return {
    providerUrl,
    wsProviderUrl,
  };
})();

module.exports = {
  db,
  eth,
};
