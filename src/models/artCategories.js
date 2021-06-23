const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const ArtCategories = sequelize.define(
  "ArtCategories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "ArtCategories",
  }
);

module.exports = { ArtCategories };
