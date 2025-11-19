'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Records extends Model {
    static associate(models) {
      Records.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Records.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accuracy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    timestamps: false,
  });

  return Records;
};
