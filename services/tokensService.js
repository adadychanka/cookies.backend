const { Tokens } = require("../models");
const logger = require("../logger");

const getTokenById = async (tokenId) => {
  try {
    const token = await Tokens.findByPk(tokenId);

    return token;
  } catch (error) {
    logger.error("Unable to get token", error);
  }
};

module.exports = {
  getTokenById,
};
