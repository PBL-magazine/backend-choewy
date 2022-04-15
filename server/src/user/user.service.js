'use strict';

const { Op } = require('sequelize');
const User = require('./user.model');
const UserUtils = require('./user.utils');

const UserService = {
  signupUser: async (userDto) => {
    const { email, nickname, password } = userDto;

    const existUser = await User.findOne({
      where: {
        [Op.or]: [{ email, nickname }],
      },
    });

    if (existUser) {
      throw {
        code: 409,
        data: {
          ok: false,
          message: '이미 존재하는 이메일 계정입니다.',
        },
      };
    }

    const hashed = UserUtils.HashPassword(password);

    try {
      await User.create({ email, nickname, password: hashed });
      return { email, nickname };
    } catch (error) {
      throw {
        code: 500,
        data: {
          ok: false,
          message: error.parent.sqlMessage,
        },
      };
    }
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
          ok: false,
          message: '존재하지 않는 계정입니다.',
        },
      };

    const valid = UserUtils.ComparePassword(password, user);
    if (!valid)
      throw {
        code: 400,
        data: {
          ok: false,
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
          ok: false,
          message: '사용자 정보를 찾을 수 없습니다.',
        },
      };

    return user;
  },
};

module.exports = UserService;
