'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Records, { foreignKey: 'userId', as: 'records' })
    }
  }
  User.init({
    name: { type: DataTypes.STRING(50), allowNull: false, unique: false },
    lastname: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    age: { type: DataTypes.INTEGER },
    pass: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  });
  return User;
};
