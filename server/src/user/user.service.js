'use strict';

const { Op } = require('sequelize');
const { User } = require('../../models');
const UserUtils = require('./user.utils');
const UserError = require('./user.error');

const UserService = {
  /* 회원가입 시 데이터 조회 및 사용자 정보를 저장합니다. */
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

  /* 로그인에 필요한 데이터를 가져온 후 로직을 수행합니다. */
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

  /* 토큰에 담긴 email, nickname에 해당하는 사용자 정보를 조회합니다. */
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
