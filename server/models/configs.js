'use strict';

const configs = {
  development: {
    username: 'root',
    password: 'root',
    database: 'magazine_development',
    host: '127.0.0.1',
    port: 5002,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'magazine_test',
    host: '127.0.0.1',
    port: 5002,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'magazine_production',
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
  },
};

module.exports = configs;
