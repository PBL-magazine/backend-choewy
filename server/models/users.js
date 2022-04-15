'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      underscored: true,
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );
  return Users;
};
