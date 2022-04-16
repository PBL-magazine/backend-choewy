'use strict';

const Comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  return Comment;
};

module.exports = Comment;
