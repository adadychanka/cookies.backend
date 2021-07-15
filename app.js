require("dotenv").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const helmet = require("helmet");

const db = require("./src/db");
const logger = require("./src/logger");
const routes = require("./src/routes");

const { runListenRaribleEvents } = require("./src/services");

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

db.connect()
  .then(() => {
    server.listen(process.env.PORT);

    logger.info("Server started successful");

    (async () => {
      await db.sync();
    })();

    // Rarible listeners
    (async () => {
      await runListenRaribleEvents();
    })();
  })
  .catch((error) => {
    logger.error("Server cannot start", error);
  });
