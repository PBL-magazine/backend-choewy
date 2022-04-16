'use strict';

require('dotenv').config();

const express = require('express');
const db = require('./models');

const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  express.static('../upload'),
  require('cors')(),
];

const controllers = [
  require('./src/user/user.controller'),
  require('./src/post/post.controller'),
  require('./src/like/like.controller'),
];

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.controllers();
    this.listen();
  }

  middlewares() {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  controllers() {
    controllers.forEach((Controller) => {
      this.app.use(...Controller());
    });
  }

  listen() {
    db.sequelize
      .sync()
      .then(() => {
        const port = 5000;
        const log = `Server Running on port ${port}`;
        this.app.listen(port, () => console.log(log));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

new App();
