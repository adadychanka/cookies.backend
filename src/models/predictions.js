const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { ArtCategories } = require("./artCategories");
const { Arts } = require("./arts");

const Predictions = sequelize.define(
  "Predictions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    artCategoryId: DataTypes.INTEGER,
    artId: DataTypes.UUID,
  },
  {
    tableName: "Predictions",
  }
);

Predictions.belongsTo(ArtCategories, {
  foreignKey: "artCategoryId",
});
Predictions.belongsTo(Arts, {
  foreignKey: "artId",
});

module.exports = { Predictions };
