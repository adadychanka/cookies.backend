const {
  isAddressHoldTokens,
  isMintTokens,
  trackTransferSingleEvent,
  processTransferSingleEvent,
  trackTransferBatchEvent,
  processTransferBatchEvent,
} = require("./raribleService");

module.exports = {
  isAddressHoldTokens,
  isMintTokens,

  trackTransferSingleEvent,
  processTransferSingleEvent,

  trackTransferBatchEvent,
  processTransferBatchEvent,
};
