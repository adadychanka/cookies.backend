const { Arts } = require("../models/arts");
const logger = require("../logger");

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
  }
};

const getArtById = async (artId) => {
  try {
    const art = await Arts.findByPk(artId, { where: { isActive: true } });

    return art ?? null;
  } catch (error) {
    logger.error("Unable to get art by id", error);
  }
};

module.exports = {
  getArts,
  getArtById,
};
