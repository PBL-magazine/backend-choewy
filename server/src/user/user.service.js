'use strict';

const { Op } = require('sequelize');
const { User } = require('../../models');
const UserUtils = require('./user.utils');

const UserService = {
  signupUser: async (userDto) => {
    const { email, nickname, password } = userDto;

    const existUser = await User.findOne({
      where: {
        [Op.or]: [{ email, nickname }],
      },
    });

    if (existUser)
      throw {
        code: 409,
        data: {
          message: '이미 존재하는 이메일 계정입니다.',
        },
      };

    const hashed = UserUtils.HashPassword(password);
    await User.create({ email, nickname, password: hashed });
    return { email, nickname };
  },

  signinUser: async (userDto) => {
    const { email, password } = userDto;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });

    if (!user)
      throw {
        code: 404,
        data: {
          message: '존재하지 않는 계정입니다.',
        },
      };

    const valid = UserUtils.ComparePassword(password, user);
    if (!valid)
      throw {
        code: 400,
        data: {
          message: '이메일 또는 비밀번호를 확인하세요.',
        },
      };

    return { email, nickname: user.nickname };
  },
  findUserByPayload: async (payload) => {
    const { email, nickname } = payload;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email, nickname }],
      },
    });

    if (!user)
      throw {
        code: 404,
        data: {
          message: '사용자 정보를 찾을 수 없습니다.',
        },
      };

    return user;
  },
};

module.exports = UserService;
