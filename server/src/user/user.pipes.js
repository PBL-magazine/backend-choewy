'use strict';

const UserService = require('./user.service');
const UserUtils = require('./user.utils');

const UserPipes = {
  async Authorization(req, res, next) {
    const { authorization } = req.headers;

    const payload = UserUtils.Authorization(authorization);

    if ([0, 1, 2].includes(payload)) {
      res.cookie('token', undefined);
      return res.status(402).send({ message: '로그인이 필요합니다.' });
    }

    try {
      const user = await UserService.findUserByPayload(payload);
      req.user = user;
      req.token = UserUtils.GenerateToken(payload);
      next();
    } catch (error) {
      const { code, data } = error;
      res.status(code).send(data);
    }
  },
};

module.exports = UserPipes;
