'use strict';

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
        timestamps: false,
      },
    );
  }
  static associate(model) {}
}

module.exports = User;
