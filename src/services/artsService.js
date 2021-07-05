const { Op } = require("sequelize");
const { Arts, ArtsMapping } = require("../models/arts");
const { Tokens } = require("../models/tokens");
const logger = require("../logger");

const ARTS = ArtsMapping;

const getArts = async () => {
  try {
    const arts = await Arts.findAll({
      where: {
        isActive: true,
      },
    });

    return arts ?? [];
  } catch (error) {
    logger.error("Unable to get arts", error);
    return [];
  }
};

const getArtsWithTokens = async () => {
  try {
    const arts = await Arts.findAll({
      where: {
        isActive: true,
      },
      include: [{ model: Tokens }],
    });

    return arts ?? [];
  } catch (error) {
    logger.error("Unable to get arts with tokens", error);
    return [];
  }
};

const getArtById = async (artId) => {
  try {
    const art = await Arts.findByPk(artId, { where: { isActive: true } });

    return art ?? null;
  } catch (error) {
    logger.error("Unable to get art by id", error);
    return null;
  }
};

const getArtsWithNftToTrack = async () => {
  const ids = [ArtsMapping.DogecoinPredictionBall];

  try {
    const arts = await Arts.findAll({
      where: {
        isActive: true,
        id: {
          [Op.in]: ids,
        },
      },
      include: [{ model: Tokens }],
    });

    const artWithNft = (arts ?? []).map((art) => {
      const nft = art?.Token?.nft;

      return {
        art,
        nft,
      };
    });

    return artWithNft ?? [];
  } catch (error) {
    logger.error("Unable to get arts to track", error);
    return [];
  }
};

module.exports = {
  getArts,
  getArtsWithTokens,
  getArtById,
  getArtsWithNftToTrack,

  ARTS,
};
