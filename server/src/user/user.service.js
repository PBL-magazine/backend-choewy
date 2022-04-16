'use strict';

const { Op } = require('sequelize');
const { User } = require('../../models');
const UserUtils = require('./user.utils');
const UserError = require('./user.error');

const UserService = {
  /* @User Signup Service */
  signupUser: async (userDto) => {
    const { email, nickname, password } = userDto;
    const existUser = await User.findOne({
      where: { [Op.or]: [{ email, nickname }] },
    });

    existUser && UserError.AlreadyExist();
    const hashed = UserUtils.HashPassword(password);
    await User.create({ email, nickname, password: hashed });
    return { email, nickname };
  },

  /* @User Signin Service */
  signinUser: async (userDto) => {
    const { email, password } = userDto;
    const user = await User.findOne({
      where: { [Op.or]: [{ email }] },
    });

    !user && UserError.NotFoundEmail();
    const valid = UserUtils.ComparePassword(password, user);
    !valid && UserError.IncorrectSign();
    return { email, nickname: user.nickname };
  },

  /* @User's Authorization Check Service */
  findUserByPayload: async (payload) => {
    const { email, nickname } = payload;
    const user = await User.findOne({
      where: { [Op.or]: [{ email, nickname }] },
    });

    !user && UserError.NotFoundUser();
    return user;
  },
};

module.exports = UserService;
