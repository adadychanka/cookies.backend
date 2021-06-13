const raribleService = require("./raribleService");
const artPredictionsService = require("../services/artPredictionsService");
const artsService = require("../services/artsService");

const trackTransferSingleEventHandler = async (response) => {
  const isMint = raribleService.isMintTokens(response);
  if (isMint) {
    return;
  }

  const { nft = null, amount = 1, fromWallet = null, toWallet = null } = raribleService.processTransferSingleEvent(
    response
  );
  // todo: remove mock
  // const nft = "139351";
  // const fromWallet = "0x04b80f3d95fe31b75fe79c0b5b7ef01132c7c07d";

  const activeArts = await artsService.getArtsWithTokens();
  const artWithSameNft = activeArts.find((art) => art?.Token?.nft === nft);
  if (artWithSameNft) {
    const artPredictions = await artPredictionsService.getArtPredictionsByArt(artWithSameNft);

    const artPredictionsToUpdate = artPredictions
      .filter((artPrediction) => artPrediction.wallet === fromWallet)
      .slice(0, amount);

    for (const artPrediction of artPredictionsToUpdate) {
      const newArtPrediction = artPredictionsService.buildBasedOnInstance(artPrediction);

      const isDisabled = await artPredictionsService.disableArtPrediction(artPrediction.id);
      if (isDisabled) {
        const prediction = { id: newArtPrediction.predictionId };

        await artPredictionsService.saveArtPrediction(prediction, artWithSameNft, toWallet);
      }
    }
  }
};

const trackTransferBatchEventHandler = async (response) => {
  const { nft = null, fromWallet = null, toWallet = null } = raribleService.processTransferSingleEvent(response);
};

const runListenRaribleEvents = async () => {
  await raribleService.trackTransferSingleEvent(trackTransferSingleEventHandler);
  await raribleService.trackTransferBatchEvent(trackTransferBatchEventHandler);
};

module.exports = {
  runListenRaribleEvents,
};
