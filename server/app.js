'use strict';

require('dotenv').config();

const express = require('express');
const db = require('./models');

// @App Middlewares
const Middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  express.static('../upload'),
  require('cors')(),
];

// @App Controllers
const Controllers = [
  require('./src/user/user.controller'),
  require('./src/post/post.controller'),
  require('./src/like/like.controller'),
  require('./src/comment/comment.controller'),
];

// @App Module
class App {
  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setControllers();
    this.listen();
  }

  setMiddlewares() {
    Middlewares.forEach((Middleware) => {
      this.app.use(Middleware);
    });
  }

  setControllers() {
    Controllers.forEach((Controller) => {
      this.app.use(...Controller());
    });
  }

  listen() {
    db.sequelize
      .sync()
      .then(() => {
        const port = process.env.PORT || 5000;
        const log = `Server Running on port ${port}`;
        this.app.listen(port, () => console.log(log));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// @App Run
new App();
