const Web3 = require("web3");
const logger = require("../../logger");
const config = require("../../config");

logger.info("Start initializing connection to ethereum blockchain provider");
const providerUrl = config.eth.providerUrl;
const provider = new Web3.providers.HttpProvider(providerUrl);
const httpWeb3 = new Web3(provider);

const wsProviderUrl = config.eth.wsProviderUrl;
const wsProvider = new Web3.providers.WebsocketProvider(wsProviderUrl);
const wsWeb3 = new Web3(wsProvider);

logger.info("End initializing connection to ethereum blockchain provider");

const isValidEthereumAddress = (address) => {
  try {
    return httpWeb3.utils.isAddress(address);
  } catch (error) {
    logger.error("Unable to check validity of ethereum address");
    return false;
  }
};

const isZeroAddress = (address) => {
  try {
    return httpWeb3.utils.toBN(address).isZero();
  } catch (error) {
    logger.error("Unable to check validity of ethereum address");
  }
};

/**
 * Convert raw ethereum address to checksummed ethereum address
 * @param address - raw ethereum address
 * @returns {string|null} - checksummed ethereum address
 */
const convertToValidAddress = (address) => {
  try {
    return httpWeb3.utils.toChecksumAddress(address);
  } catch (error) {
    logger.error("Unable convert address to checksummed address");
    return null;
  }
};

const getHttpWeb3Instance = () => {
  return httpWeb3;
};

const getWsWeb3Instance = () => {
  return wsWeb3;
};

const getWeb3InstanceProtocol = (web3) => {
  if (web3?.currentProvider instanceof Web3.providers.WebsocketProvider) {
    return Protocols.WebSocket;
  }
  if (web3?.currentProvider instanceof Web3.providers.HttpProvider) {
    return Protocols.Http;
  }
};

const Protocols = {
  Http: "http",
  WebSocket: "ws",
};

module.exports = {
  isValidEthereumAddress,
  isZeroAddress,
  convertToValidAddress,

  getHttpWeb3Instance,
  getWsWeb3Instance,
  getWeb3InstanceProtocol,

  Protocols,
};
