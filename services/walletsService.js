const ethService = require("./ethereumService");
const raribleService = require("./raribleService");

const isValidWallet = (wallet) => {
  if (!wallet) return false;

  const address = wallet?.trim() ?? "";

  const isValid = ethService.isValidEthereumAddress(address);

  return isValid;
};

const isZeroWallet = (wallet) => {
  if (!wallet) return true;

  const address = wallet?.trim() ?? "";

  return ethService.isZeroAddress(address);
};

const isValidPurchase = (nft, wallet) => {
  if (!wallet || !nft) return false;

  const hasTokens = raribleService.isAddressHoldTokens(wallet, nft);

  return hasTokens;
};

module.exports = {
  isZeroWallet,
  isValidWallet,
  isValidPurchase,
};
