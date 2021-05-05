const ethService = require("./ethereumService");

const isValidWallet = (wallet) => {
  if (!wallet) return false;

  const address = wallet?.trim() ?? "";

  const isValid = ethService.isValidEthereumAddress(address);

  return isValid;
};

module.exports = {
  isValidWallet,
};
