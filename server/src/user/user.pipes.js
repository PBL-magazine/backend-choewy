'use strict';

const UserService = require('./user.service');
const UserUtils = require('./user.utils');

const UserPipes = {
  async Authorization(req, res, next) {
    const { authorization } = req.headers;
    const payload = UserUtils.Authorization(authorization);

    if ([0, 1, 2].includes(payload)) {
      res.cookie('token', undefined);
      return res.status(401).send({
        ok: false,
        message: '로그인이 필요합니다.',
      });
    }

    try {
      const user = await UserService.findUserByPayload(payload);
      req.user = user;
      // 토큰 재발급
      // req.token = UserUtils.GenerateToken(payload);
      req.token = authorization.split(' ')[1];
      next();
    } catch (error) {
      const { code, data } = error;
      res.status(code).send(data);
    }
  },
};

module.exports = UserPipes;
