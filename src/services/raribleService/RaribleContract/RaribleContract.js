const abi = require("./abi");

const raribleContractAddress = "0xd07dc4262BCDbf85190C01c996b4C06a461d2430";

class RaribleContract {
  constructor(web3) {
    this.contract = new web3.eth.Contract(abi, raribleContractAddress);
  }

  subscribeTo(eventName, options, callback) {
    return this.contract.events[eventName](options, callback);
  }

  async getPastEvents() {
    const options = {};

    const result = await this.contract.getPastEvents("allEvents", options);

    return result;
  }

  async getName() {
    return await this.contract.methods.name().call();
  }

  async getBalance(address, tokenId) {
    return await this.contract.methods.balanceOf(address, tokenId).call();
  }

  async getCreators(tokenId) {
    return await this.contract.methods.creators(tokenId).call();
  }

  async getOwner(tokenId) {
    return await this.contract.methods.ownerOf(tokenId).call();
  }
}

module.exports = {
  RaribleContract,
};
