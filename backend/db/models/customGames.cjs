"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CustomGames extends Model {
    static associate(models) {
      CustomGames.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  CustomGames.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gameName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exercises: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "CustomGame",
      tableName: "CustomGames",
      timestamps: true,
    }
  );

  return CustomGames;
};
