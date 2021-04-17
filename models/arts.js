const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Arts = sequelize.define(
  "Arts",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkToBuy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkToArt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // TODO: createdBy
    // TODO: artCategoryId
    // TODO: tokenId
  },
  {
    tableName: "Arts",
  }
);

module.exports = Arts;
