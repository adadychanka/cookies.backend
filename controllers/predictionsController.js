const predictionsService = require("../services/predictionsService");
const walletsService = require("../services/walletsService");
const { toApiResult } = require("./utils");

const generatePrediction = async (req, res) => {
  const wallet = req.params?.wallet ?? null;

  const isValidWallet = walletsService.isValidWallet(wallet);
  if (!isValidWallet) {
    const result = toApiResult(null, "Invalid wallet");
    return res.status(400).send(result);
  }

  const artId = req.params?.artId ?? null;
  if (!artId) {
    const result = toApiResult(null, "Invalid art id");
    return res.status(400).send(result);
  }

  const prediction = await predictionsService.generatePrediction(artId, wallet);

  if (!prediction) {
    const result = toApiResult(null, "Could not generate prediction");
    return res.status(400).send(result);
  }

  const result = toApiResult(prediction);
  return res.status(200).send(result);
};

const getAssignedPredictions = async (req, res) => {
  const artId = req.params?.artId ?? null;
  if (!artId) {
    const result = toApiResult(null, "Invalid art id");
    return res.status(400).send(result);
  }

  const predictions = await predictionsService.getAssignedPredictions(artId);

  const result = toApiResult(predictions);

  return res.status(200).send(result);
};

module.exports = {
  generatePrediction,
  getAssignedPredictions,
};
