'use strict';

require('dotenv').config();

const express = require('express');
const db = require('./models');

// @App Middlewares
const Middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
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
    this.app.use('/image', express.static('./upload'));
    this.app.use('/', express.static(__dirname + '/views'));
    Middlewares.forEach((Middleware) => {
      this.app.use(Middleware);
    });
  }

  setControllers() {
    Controllers.forEach((Controller) => {
      this.app.use(...Controller());
    });
    this.app.use('*', (_, res) => {
      res.sendFile(__dirname + '/views/index.html');
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
