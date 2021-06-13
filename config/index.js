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
  const wsProviderUrl = process.env.ETH_WS_PROVIDER_URL;

  return {
    providerUrl,
    wsProviderUrl,
  };
})();

const art = (() => {
  const trackedNft = (process.env?.RARIBLE_TRACKED_ARTS ?? "").split(",");

  return {
    trackedNft,
  };
})();

module.exports = {
  db,
  eth,
  art,
};
