'use strict';

const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: DataTypes.TEXT,
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

  return Post;
};

module.exports = Post;
