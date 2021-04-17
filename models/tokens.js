const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Tokens = sequelize.define(
  "Tokens",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    ntf: {
      // TODO: String? Or Number?
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Tokens",
  }
);

module.exports = Tokens;
