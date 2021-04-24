const { Arts } = require("../models/arts");

const getArts = async () => {
  const arts =
    (await Arts.findAll({
      where: {
        isActive: true,
      },
    })) ?? [];

  return arts;
};

const getArtById = async (artId) => {
  const art = await Arts.findByPk(artId, { where: { isActive: true } });

  return art ?? null;
};

module.exports = {
  getArts,
  getArtById,
};
