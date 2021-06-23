const express = require("express");
const router = express.Router();

const artsRoutes = require("./arts");
const predictionsRoutes = require("./predictions");

router.use("/api/arts", artsRoutes);
router.use("/api/predictions", predictionsRoutes);

module.exports = router;
