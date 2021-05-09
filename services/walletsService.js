const ethService = require("./ethereumService");

const isValidWallet = (wallet) => {
  if (!wallet) return false;

  const address = wallet?.trim() ?? "";

  const isValid = ethService.isValidEthereumAddress(address);

  return isValid;
};

const isValidPurchase = (nft, wallet) => {
  if (!wallet || !nft) return false;

  const hasTokens = ethService.isAddressHoldTokens(wallet, nft);

  return hasTokens;
};

module.exports = {
  isValidWallet,
  isValidPurchase,
};
