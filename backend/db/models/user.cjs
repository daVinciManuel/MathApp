"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Records, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING(50), allowNull: false, unique: false },
      lastname: { type: DataTypes.STRING(50) },
      email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      age: { type: DataTypes.INTEGER },
      pass: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "student",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );
  return User;
};
