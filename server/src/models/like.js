'use strict';

const Like = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {},
    {
      sequelize,
      modelName: 'Like',
      tableName: 'likes',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
      underscored: true,
    },
  );

  return Like;
};

module.exports = Like;
