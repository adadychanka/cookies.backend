const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../db");
const { Tokens } = require("../tokens");
const { Artists } = require("../artists");
const { ArtCategories } = require("../artCategories");

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
    tokenId: DataTypes.UUID,
    artCategoryId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
  },
  {
    tableName: "Arts",
  }
);

Arts.belongsTo(Tokens, {
  foreignKey: "tokenId",
});
Arts.belongsTo(ArtCategories, {
  foreignKey: "artCategoryId",
});
Arts.belongsTo(Artists, {
  foreignKey: "createdBy",
});

module.exports = { Arts };
