'use strict';

const Response = require('../../commons/response');
const UserError = require('./user.error');
const UserService = require('./user.service');
const UserUtils = require('./user.utils');

const UserPipes = {
  /* 클라이언트로부터 전달받은 토큰을 검사합니다. */
  async Authorization(req, res, next) {
    let payload;
    let authorization;

    /* 토큰이 유효하지 않다면 오류를 발생시키고 즉시 응답합니다. */
    try {
      authorization = req.headers['authorization'];
      payload = UserUtils.Authorization(authorization);
      const isInvalid = [0, 1, 2].includes(payload);
      isInvalid && UserError.NeedSignin();
    } catch (error) {
      res.cookie('token', undefined);
      return Response.Fails(res, error);
    }

    /* 토큰에 저장된 사용된 정보가 DB에 없다면 오류를 발생시키고 즉시 응답합니다. */
    try {
      const user = await UserService.findUserByPayload(payload);
      req.user = user;
      next();
    } catch (error) {
      return Response.Fails(res, error);
    }
  },
};

module.exports = UserPipes;
