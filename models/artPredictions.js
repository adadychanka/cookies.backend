const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const Arts = require("./arts");
const Predictions = require("./predictions");

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
    predictionId: DataTypes.INTEGER,
    artId: DataTypes.UUID,
  },
  {
    tableName: "ArtPredictions",
  }
);

ArtPredictions.belongsTo(Predictions, {
  foreignKey: "predictionId",
});
ArtPredictions.belongsTo(Arts, {
  foreignKey: "artId",
});

module.exports = ArtPredictions;
