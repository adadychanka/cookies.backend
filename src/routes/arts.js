const express = require("express");
const router = express.Router();
const artsController = require("../controllers/artsController");

router.get("/", artsController.getArts);
router.get("/dogecoinPredictionBall", artsController.getDogecoinPredictionBallArt);
router.get("/:id", artsController.getArtById);

module.exports = router;
