'use strict';

const Sequelize = require('sequelize');
const configs = require('./configs.js');

const Models = [require('../user/user.model'), require('../post/post.model')];

const DB = (env) => {
  const db = {};
  const config = configs[env];
  const sequelize = new Sequelize(config);

  db.sequelize = sequelize;

  Models.forEach((Model) => {
    db[Model] = Model;
    Model.init(sequelize);
    Model.associate(db);
  });

  return db;
};

module.exports = DB;
