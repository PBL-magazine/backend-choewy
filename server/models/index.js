'use strict';

const Sequelize = require('sequelize');
const configs = require('./configs.json');

const db = {};
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Post = require('./post')(sequelize, Sequelize.DataTypes);
const Like = require('./like')(sequelize, Sequelize.DataTypes);

const Models = [User, Post, Like];

User.hasMany(Post, { foreignKey: 'user_id', as: 'post' });
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Like, { foreignKey: 'user_id', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Post.hasMany(Like, { foreignKey: 'post_id', as: 'likes' });
Like.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

Models.forEach((Model) => {
  db[Model.name] = Model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
