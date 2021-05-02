const { Sequelize } = require("sequelize");
const logger = require("../logger");
const config = require("config");

// const { database, user, password, options } = config.get('dbConfig');
const database = "Cookies";
const user = "postgres";
const password = "1";
const options = {
  host: "localhost",
  dialect: "postgres",
  seederStorage: "sequelize",
};

const sequelize = new Sequelize(database, user, password, options);

const connect = async () => {
  try {
    logger.info("Start connecting to DB");
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

const sync = async () => {
  try {
    // TODO: add match param for except execution on prod
    logger.info("Start syncing models");

    await sequelize.sync({ alter: true });

    logger.info("End syncing models");
  } catch (error) {
    logger.error("Unable to sync all models", error);
  }
};

const db = {};

db.connect = connect;
db.sequelize = sequelize;
db.sync = sync;

module.exports = db;
