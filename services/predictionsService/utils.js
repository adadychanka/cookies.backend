const hasAvailablePredictions = (art, artActivePredictions = []) => {
  const totalAmountArtPredictions = art?.amount ?? 0;
  const amountActivePredictions = artActivePredictions.length;

  return amountActivePredictions < totalAmountArtPredictions;
};

const getRandomPredictionIndex = (predictionsAmount) => {
  if (predictionsAmount <= 0) return null;

  return Math.floor(Math.random() * predictionsAmount);
};

const selectRandomPrediction = (availablePredictions = []) => {
  const index = getRandomPredictionIndex(availablePredictions.length);

  return index !== null ? availablePredictions[index] : null;
};

const getAvailablePredictions = (predictions = [], assignedArtPredictions = []) => {
  const assignedPredictionsIds = assignedArtPredictions.map((artPrediction) => artPrediction.predictionId);

  return predictions.filter((prediction) => !assignedPredictionsIds.includes(prediction.id));
};

module.exports = {
  hasAvailablePredictions,
  selectRandomPrediction,
  getAvailablePredictions,
};
