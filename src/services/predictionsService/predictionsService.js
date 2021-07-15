const { Op } = require("sequelize");
const { Predictions } = require("../../models");
const { selectRandomPrediction, hasAvailablePredictions, getAvailablePredictions } = require("./utils");
const artPredictionsService = require("../artPredictionsService");
const artsService = require("../artsService");
const tokensService = require("../tokensService");
const walletsService = require("../walletsService");
const ethereumService = require("../ethereumService");
const logger = require("../../logger");

const generatePrediction = async (artId, wallet) => {
  const art = await artsService.getArtById(artId);
  if (!art) return null;

  const token = await tokensService.getTokenById(art.tokenId);
  if (!token) return null;

  const holderAddress = ethereumService.convertToValidAddress(wallet);
  const isValidPurchase = await walletsService.isValidPurchase(token.nft, holderAddress);
  // if (!isValidPurchase) {
  //   return null;
  // }

  const assignedArtPredictions = await artPredictionsService.getArtPredictionsByArt(art);

  const alreadyGeneratedPrediction = assignedArtPredictions.find(
    (artPrediction) => artPrediction.wallet === holderAddress
  );
  if (alreadyGeneratedPrediction) {
    const { predictionId = null } = alreadyGeneratedPrediction;
    const prediction = await getPredictionById(predictionId);

    return prediction;
  }

  const canGeneratePrediction = hasAvailablePredictions(art, assignedArtPredictions);
  if (canGeneratePrediction) {
    const predictions = await getPredictionsByArt(art);
    const availablePredictions = getAvailablePredictions(predictions, assignedArtPredictions);

    const prediction = selectRandomPrediction(availablePredictions);

    const result = await artPredictionsService.saveArtPrediction(prediction, art, holderAddress);

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
        isActive: true,
        artId: art.id,
      },
    });

    return predictions ?? [];
  } catch (error) {
    logger.error("Unable to get predictions by art", error);

    return [];
  }
};

const getPredictionsByIds = async (ids = []) => {
  if (ids.length === 0) {
    return [];
  }

  try {
    const predictions = await Predictions.findAll({
      where: {
        isActive: true,
        id: {
          [Op.in]: ids,
        },
      },
    });

    return predictions ?? [];
  } catch (error) {
    logger.error("Unable to get predictions by ids", error);

    return [];
  }
};

const getPredictionById = async (id) => {
  if (!id) {
    return null;
  }

  try {
    const prediction = await Predictions.findByPk(id);

    return prediction;
  } catch (error) {
    logger.error("Unable to get prediction by id", error);

    return null;
  }
};

const emptyResult = { rows: [], total: 0 };
const getAssignedPredictions = async (artId) => {
  if (!artId) {
    return emptyResult;
  }

  const art = await artsService.getArtById(artId);
  if (!art) {
    return emptyResult;
  }

  const artPredictions = await artPredictionsService.getArtPredictionsByArt(art);
  const predictionsIds = artPredictions.map((artPrediction) => artPrediction.predictionId);

  const assignedPredictions = await getPredictionsByIds(predictionsIds);

  const rows = assignedPredictions.map((prediction) => {
    const predictionId = prediction.id;

    const artPrediction = artPredictions.find((artPrediction) => artPrediction.predictionId === predictionId);
    const wallet = artPrediction?.wallet ?? null;

    const row = {
      id: predictionId,
      wallet,
      text: prediction.text,
    };

    return row;
  });
  const total = art?.amount ?? 0;

  const result = { rows, total };

  return result;
};

module.exports = {
  generatePrediction,
  getPredictionsByIds,
  getAssignedPredictions,
};
