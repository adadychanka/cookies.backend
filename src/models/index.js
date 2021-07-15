const { Arts, ArtsMapping } = require("./arts");
const { ArtCategories } = require("./artCategories");
const { Artists } = require("./artists");
const { Tokens } = require("./tokens");
const { Predictions } = require("./predictions");
const { ArtPredictions } = require("./artPredictions");
const utils = require("./utils");

module.exports = {
  Arts,
  ArtsMapping,

  ArtCategories,
  Artists,
  Tokens,
  Predictions,
  ArtPredictions,

  modelUtils: utils,
};
