const Environments = {
  DEV: "DEV",
  STAGE: "STAGE",
  PROD: "PROD",
};

function isDevelopment() {
  return process.env.ENV === Environments.DEV;
}

function isStaging() {
  return process.env.ENV === Environments.STAGE;
}

function isProduction() {
  return process.env.ENV === Environments.PROD;
}

module.exports = {
  Environments,

  isDevelopment,
  isStaging,
  isProduction,
};
