const uuid = require("uuid");
const artsService = require("../services/artsService");
const { toApiResult } = require("./utils");

const getArts = async (req, res) => {
  const arts = await artsService.getArts();

  const result = toApiResult(arts);
  return res.status(200).send(result);
};

const getArtById = async (req, res) => {
  const artId = req.params?.id ?? null;

  const isIdValid = uuid.validate(artId);
  if (!isIdValid) {
    const result = toApiResult(null, "Art id is not valid");
    return res.status(400).send(result);
  }

  const art = await artsService.getArtById(artId);

  if (!art) {
    const result = toApiResult(null, "Art was not found");
    return res.status(404).send(result);
  }

  const result = toApiResult(art);
  return res.status(200).send(result);
};

module.exports = {
  getArts,
  getArtById,
};
