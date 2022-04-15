'use strict';

require('dotenv').config();
const express = require('express');

const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  require('cors')(),
];

const controllers = [require('./src/user/user.controller')];

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
    const port = 5000;
    const log = `Server Running on port ${port}`;
    this.app.listen(port, () => console.log(log));
  }
}

new App();
