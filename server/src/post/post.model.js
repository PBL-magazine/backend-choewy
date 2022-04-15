'use strict';

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        content: DataTypes.STRING,
        image_url: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
        timestamps: true,
        paranoid: true,
      },
    );
  }
  static associate(model) {}
}

module.exports = Post;
