const { RaribleContract, Events, TransferEventResultFields } = require("./RaribleContract");
const { getWsWeb3Instance, getHttpWeb3Instance, isZeroAddress } = require("../ethereumService/ethereumService");
const logger = require("../../logger");

const isAddressHoldTokens = async (address, nft) => {
  const web3 = getHttpWeb3Instance();
  const raribleContract = new RaribleContract(web3);

  try {
    const balance = await raribleContract.getBalance(address, nft);

    return balance > 0;
  } catch (error) {
    logger.error("Unable get rarible contract info", error);
  }
};

const isMintTokens = (eventResponse) => {
  const values = eventResponse?.returnValues ?? {};
  const fromAddress = values[TransferEventResultFields.From];

  const isNullAddress = isZeroAddress(fromAddress);

  return isNullAddress;
};

const processTransferSingleEvent = (eventResponse) => {
  const values = eventResponse?.returnValues ?? {};

  const data = {
    tokens: [
      {
        id: values[TransferEventResultFields.TokenId],
        amount: parseInt(values[TransferEventResultFields.TokenAmount]),
      },
    ],
    fromWallet: values[TransferEventResultFields.From],
    toWallet: values[TransferEventResultFields.To],
  };

  return data;
};

const processTransferBatchEvent = (eventResponse) => {
  const values = eventResponse?.returnValues ?? {};
  const amounts = parseInt(values[TransferEventResultFields.TokenAmount]);
  const tokenIds = values[TransferEventResultFields.TokenId];

  const tokens = tokenIds.map((tokenId, index) => {
    const amount = amounts[index];

    return {
      id: tokenId,
      amount,
    };
  });

  const data = {
    tokens,
    fromWallet: values[TransferEventResultFields.From],
    toWallet: values[TransferEventResultFields.To],
  };

  return data;
};

const trackTransferSingleEvent = (callback, trackedTokens = []) => {
  const web3 = getWsWeb3Instance();
  const raribleContract = new RaribleContract(web3);
  const eventName = Events.TransferSingle;
  const options = {
    filter: { [TransferEventResultFields.TokenId]: trackedTokens },
  };

  logger.info(`Start subscribing to RaribleContract ${eventName} event`);
  const event = raribleContract.subscribeTo(eventName, options, function (error, result) {
    if (error) {
      logger.error(`Error while firing callback on [${eventName}] of RaribleContact`, error);
    }

    callback(result);
  });

  return event;
};

const trackTransferBatchEvent = (callback, trackedTokens = []) => {
  const web3 = getWsWeb3Instance();
  const raribleContract = new RaribleContract(web3);
  const eventName = Events.TransferBatch;

  const options = {
    filter: { [TransferEventResultFields.TokenId]: trackedTokens },
  };

  logger.info(`Start subscribing to RaribleContract ${eventName} event`);
  const event = raribleContract.subscribeTo(eventName, options, function (error, result) {
    if (error) {
      logger.error(`Error while firing callback on [${eventName}] of RaribleContact`, error);
    }

    callback(result);
  });

  return event;
};

module.exports = {
  isAddressHoldTokens,
  isMintTokens,

  trackTransferSingleEvent,
  processTransferSingleEvent,

  trackTransferBatchEvent,
  processTransferBatchEvent,
};
