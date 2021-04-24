const artsService = require("../services/artsService");

const getArts = async (req, res) => {
  const arts = await artsService.getArts();

  return res.status(200).send(arts);
};

const getArtById = async (req, res) => {
  const artId = "d43a4254-2459-4808-827a-be0736db9bf3";
  const art = await artsService.getArtById(artId);

  if (!art) {
    return res.status(404).send();
  }

  return art.status(200).send(art);
};

module.exports = {
  getArts,
  getArtById,
};
