'use strict';

const { Router } = require('express');

const Response = require('../../commons/response');
const UserPipes = require('./user.pipes');
const UserService = require('./user.service');
const UserUtils = require('./user.utils');
const UserValidation = require('./user.validations');

const UserController = () => {
  const prefix = '/api/users';
  const router = Router();

  /* 사용자 회원가입을 진행합니다. */
  router.post(
    '/signup',
    UserValidation.Email,
    UserValidation.Nickname,
    UserValidation.Password,
    async (req, res) => {
      try {
        const payload = await UserService.signupUser(req.body);
        const token = UserUtils.GenerateToken(payload);
        res.cookie('token', token);
        Response.Success.Created(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  /* 사용자 인증을 수행합니다. */
  router.post(
    '/signin',
    UserValidation.Email,
    UserValidation.Password,
    async (req, res) => {
      try {
        const payload = await UserService.signinUser(req.body);
        const token = UserUtils.GenerateToken(payload);
        res.cookie('token', token);
        Response.Success.Created(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  /* 사용자의 인가 상태를 판단합니다. */
  router.get('/auth', UserPipes.Authorization, (req, res) => {
    try {
      const user = {
        user_id: req.user.user_id,
        email: req.user.email,
        nickname: req.user.nickname,
        role: req.user.role,
      };
      Response.Success.Created(res, { user });
    } catch (error) {
      Response.Fails(res, error);
    }
  });

  /* 로그아웃을 합니다. */
  router.delete('/signout', (_, res) => {
    res.cookie('token', undefined);
    Response.Success.Ok(res);
  });

  return [prefix, router];
};

module.exports = UserController;
