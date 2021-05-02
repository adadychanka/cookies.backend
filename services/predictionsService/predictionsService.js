const { Op } = require("sequelize");
const { Predictions } = require("../../models/predictions");
const { selectRandomPrediction, hasAvailablePredictions, getAvailablePredictions } = require("./utils");
const artPredictionsService = require("../artPredictionsService");
const artsService = require("../artsService");
const logger = require("../../logger");

const generatePrediction = async (artId, wallet) => {
  const art = await artsService.getArtById(artId);
  if (!art) return null;

  const assignedArtPredictions = await artPredictionsService.getArtPredictionsByArt(art);

  const canGeneratePrediction = hasAvailablePredictions(art, assignedArtPredictions);

  if (canGeneratePrediction) {
    const predictions = await getPredictionsByArt(art);
    const availablePredictions = getAvailablePredictions(predictions, assignedArtPredictions);

    const prediction = selectRandomPrediction(availablePredictions);

    const result = await artPredictionsService.saveArtPrediction(prediction, art, wallet);

    return result ? prediction : null;
  } else {
    return null;
  }
};

const getPredictionsByArt = async (art) => {
  if (!art) {
    return [];
  }

  try {
    const predictions = await Predictions.findAll({
      where: {
        artId: art.id,
      },
    });

    return predictions;
  } catch (error) {
    logger.error("Unable to get predictions by art", error);
  }
};

const getPredictionsByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    return [];
  }

  try {
    const predictions = await Predictions.findAll({
      where: {
        [Op.in]: ids,
      },
    });

    return predictions;
  } catch (error) {
    logger.error("Unable to get predictions by ids", error);
  }
};

module.exports = {
  generatePrediction,
  getPredictionsByIds,
};
