require("dotenv").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const helmet = require("helmet");

const db = require("./db");
const logger = require("./logger");
const routes = require("./routes");

const { runListenRaribleEvents } = require("./services");

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

db.connect()
  .then(() => {
    server.listen(4000);

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
