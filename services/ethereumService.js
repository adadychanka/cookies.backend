const Web3 = require("web3");
const logger = require("../logger");
const config = require("../config");

logger.info("Start connecting to ethereum blockchain provider");
const providerUrl = config.eth.providerUrl;
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);
logger.info("End connecting to ethereum blockchain provider");

const isValidEthereumAddress = (address) => {
  try {
    return web3.utils.isAddress(address);
  } catch (error) {
    logger.error("Unable to check validity of ethereum address");
  }
};

module.exports = {
  isValidEthereumAddress,
};
