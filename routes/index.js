const express = require("express");
const router = express.Router();

const artsRoutes = require("./arts");

router.use("/api/arts", artsRoutes);

module.exports = router;
