'use strict';

const Sequelize = require('sequelize');
const configs = require('./configs');

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
const Comment = require('./comment')(sequelize, Sequelize.DataTypes);

const Models = [User, Post, Like, Comment];

/* User --< Post */
User.hasMany(Post, { foreignKey: 'user_id', as: 'post' });
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

/* User --< Like >-- Post */
User.hasMany(Like, { foreignKey: 'user_id', as: 'likes' });
Post.hasMany(Like, { foreignKey: 'post_id', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Like.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

/* User --< Comment >-- Post */
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comment' });
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comment' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

Models.forEach((Model) => {
  db[Model.name] = Model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
