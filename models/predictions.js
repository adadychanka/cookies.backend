const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { ArtCategories } = require("./artCategories");

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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    artCategoryId: DataTypes.INTEGER,
  },
  {
    tableName: "Predictions",
  }
);

Predictions.belongsTo(ArtCategories, {
  foreignKey: "artCategoryId",
});

module.exports = { Predictions };
