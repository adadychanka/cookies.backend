require("dotenv").config();

const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./db");
const logger = require("./logger");

const models = require("./models");

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect()
  .then(() => {
    server.listen(4000);

    logger.info("Server started successful");

    (async () => {
      await db.sync();
    })();
  })
  .catch((error) => {
    logger.error("Server cannot start", error);
  });
