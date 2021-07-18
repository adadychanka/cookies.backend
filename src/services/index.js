const logger = require("../logger");
const raribleService = require("./raribleService");
const artPredictionsService = require("./artPredictionsService");
const artsService = require("./artsService");

const trackTransferSingleEventHandler = async (response) => {
  const isMint = raribleService.isMintTokens(response);
  if (isMint) {
    return;
  }

  const { tokens = [], fromWallet = null, toWallet = null } = raribleService.processTransferSingleEvent(response);
  const nft = tokens[0]?.id;
  const amount = tokens[0]?.amount;

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
  const isMint = raribleService.isMintTokens(response);
  if (isMint) {
    return;
  }

  const { tokens = [], fromWallet = null, toWallet = null } = raribleService.processTransferBatchEvent(response);

  const activeArts = await artsService.getArtsWithTokens();
  const artsWithSameNft = activeArts.filter((art) => {
    const artTokenId = art?.Token?.nft;

    return tokens.some((token) => token.id === artTokenId);
  });

  for (const artWithSameNft of artsWithSameNft) {
    const { id = null, amount = 0 } = tokens.find((token) => token.id === artWithSameNft?.Token?.nft);
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

const runListenRaribleEvents = async () => {
  const arts = await artsService.getArtsWithNftToTrack();
  const trackedTokens = arts
    .map((art) => {
      const tokenId = art.nft;
      return tokenId;
    })
    .filter((nft) => nft);

  logger.info(`Start tracking NFT: ${trackedTokens.join(",")}`);

  await raribleService.trackTransferSingleEvent(trackTransferSingleEventHandler, trackedTokens);
  await raribleService.trackTransferBatchEvent(trackTransferBatchEventHandler, trackedTokens);
};

module.exports = {
  runListenRaribleEvents,
};
