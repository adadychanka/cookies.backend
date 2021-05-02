const express = require("express");
const router = express.Router();
const predictionsController = require("../controllers/predictionsController");

router.get("/:artId/assigned", predictionsController.getAssignedPredictions);
router.get("/:wallet/:artId", predictionsController.generatePrediction);

module.exports = router;
