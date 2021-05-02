const { ArtPredictions } = require("../models/artPredictions");
const logger = require("../logger");

const getArtPredictionsByArt = async (art) => {
  if (!art) return [];

  try {
    const artPredictions = await ArtPredictions.findAll({
      where: {
        isActive: true,
        artId: art.id,
      },
    });

    return artPredictions;
  } catch (error) {
    logger.error("Unable to get artPredictions by art", error);
  }
};

const saveArtPrediction = async (prediction, art, wallet) => {
  const artId = art?.id;
  const predictionId = prediction?.id;

  if (!predictionId || !artId || !wallet) {
    return null;
  }

  try {
    const artPrediction = {
      wallet,
      isActive: true,
      predictionId: predictionId,
      artId: artId,
    };

    const result = await ArtPredictions.create(artPrediction);

    return result;
  } catch (error) {
    logger.error("Unable to save artPrediction", error);
  }
};
module.exports = {
  getArtPredictionsByArt,
  saveArtPrediction,
};
