'use strict';

const Response = require('../../commons/response');
const UserError = require('./user.error');
const UserService = require('./user.service');
const UserUtils = require('./user.utils');

const UserPipes = {
  /* @User Token Verification Check Pipe */
  async Authorization(req, res, next) {
    const { authorization } = req.headers;
    const payload = UserUtils.Authorization(authorization);

    try {
      const isInvalid = [0, 1, 2].includes(payload);
      isInvalid && UserError.NeedSignin();
    } catch (error) {
      res.cookie('token', undefined);
      Response.Fails(res, error);
    }

    try {
      const user = await UserService.findUserByPayload(payload);
      req.user = user;
      req.token = authorization.split(' ')[1];
      next();
    } catch (error) {
      Response.Fails(res, error);
    }
  },
};

module.exports = UserPipes;
