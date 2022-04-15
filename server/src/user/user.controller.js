'use strict';

const { Router } = require('express');
const UserPipes = require('./user.pipes');
const UserService = require('./user.service');
const UserUtils = require('./user.utils');
const UserValidation = require('./user.validations');

const UserController = () => {
  const prefix = '/api/users';
  const router = Router();

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
        res.status(201).send({ ok: true });
      } catch (error) {
        const { code, data } = error;
        res.status(code).send(data);
      }
    },
  );

  router.post(
    '/signin',
    UserValidation.Email,
    UserValidation.Password,
    async (req, res) => {
      try {
        const payload = await UserService.signinUser(req.body);
        const token = UserUtils.GenerateToken(payload);
        res.cookie('token', token);
        res.status(200).send({ ok: true });
      } catch (error) {
        const { code, data } = error;
        res.status(code).send(data);
      }
    },
  );

  router.get('/auth', UserPipes.UserAuthorization, (req, res) => {
    const data = {
      ok: true,
      user: {
        email: req.user.email,
        nickname: req.user.nickname,
        createdAt: req.user.createdAt,
      },
    };
    res.cookie('token', req.token);
    res.status(200).send(data);
  });

  return [prefix, router];
};

module.exports = UserController;
