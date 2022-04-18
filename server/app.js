'use strict';

require('dotenv').config();

const express = require('express');
const db = require('./models');

/* 서버 앱에 필요한 미들웨어 입니다. */
const Middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  require('cors')(),
];

/* 서버 앱에 필요한 컨트롤러 입니다. */
const Controllers = [
  require('./src/user/user.controller'),
  require('./src/post/post.controller'),
  require('./src/like/like.controller'),
  require('./src/comment/comment.controller'),
];

/* 서버 앱 클래스 입니다. */
class App {
  /* 생성자를 통해 서버 앱이 실행되도록 하였습니다. */
  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setControllers();
    this.listen();
  }

  /* 미들웨어를 등록합니다. */
  setMiddlewares() {
    this.app.use('/image', express.static('./upload'));
    this.app.use('/', express.static(__dirname + '/views'));
    Middlewares.forEach((Middleware) => {
      this.app.use(Middleware);
    });
  }

  /* 컨트롤러를 미들웨어로 등록합니다. */
  setControllers() {
    Controllers.forEach((Controller) => {
      this.app.use(...Controller());
    });

    this.app.use('*', (_, res) => {
      res.sendFile(__dirname + '/views/index.html');
    });
  }

  /* Sequelize와 서버를 실행합니다. */
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

/* 서버 애플리케이션을 실행시킵니다. */
new App();
