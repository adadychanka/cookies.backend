const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const ArtPredictions = sequelize.define(
  "ArtPredictions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    wallet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // TODO: predictionId
    // TODO: artId
  },
  {
    tableName: "ArtPredictions",
  }
);

module.exports = ArtPredictions;
