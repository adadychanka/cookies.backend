const { ArtPredictions, modelUtils } = require("../models");
const logger = require("../logger");

const getArtPredictionsByArt = async (art) => {
  const artId = art?.id;
  if (!artId) return [];

  try {
    const artPredictions = await ArtPredictions.findAll({
      where: {
        isActive: true,
        artId: artId,
      },
    });

    return artPredictions;
  } catch (error) {
    logger.error("Unable to get artPredictions by art", error);
    return null;
  }
};

const disableArtPrediction = async (artPredictionId) => {
  try {
    const artPrediction = await ArtPredictions.findByPk(artPredictionId);
    if (artPrediction) {
      artPrediction.isActive = false;

      await artPrediction.save();

      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error("Unable to disable artPrediction");
    return false;
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
    return null;
  }
};

const buildBasedOnInstance = (instance) => {
  try {
    const dataObject = modelUtils.fromModelInstanceToObject(instance);
    const newInstance = ArtPredictions.build(dataObject);

    return newInstance;
  } catch (error) {
    logger.error("Unable build artPrediction", error);
    return null;
  }
};

module.exports = {
  getArtPredictionsByArt,

  saveArtPrediction,

  disableArtPrediction,

  buildBasedOnInstance,
};
