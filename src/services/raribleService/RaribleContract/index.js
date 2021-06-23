const { RaribleContract } = require("./RaribleContract");

const TransferEventResultFields = {
  From: "1",
  To: "2",
  TokenId: "3",
  TokenAmount: "4",
};

const Events = {
  AllEvents: "allEvents",
  TransferSingle: "TransferSingle",
  TransferBatch: "TransferBatch",
};

module.exports = {
  RaribleContract,
  TransferEventResultFields,
  Events,
};
