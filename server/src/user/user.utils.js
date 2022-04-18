'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const rounds = Number(process.env.ROUNDS) || 10;

const UserUtils = {
  /* 사용자 비밀번호를 암호회합니다. */
  HashPassword(password) {
    const salt = bcrypt.genSaltSync(rounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },

  /* 비밀번호 일치여부를 확인합니다. */
  ComparePassword(password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  /* 토큰을 발급합니다. */
  GenerateToken(payload) {
    return jwt.sign(payload, secret);
  },

  /* 토큰의 유효성을 검사합니다. */
  Authorization(authorization) {
    const [type, token] = (authorization || '').split(' ');
    if (type !== 'Bearer' || !token) return 0;
    try {
      const payload = jwt.verify(token, secret);
      if (!payload) return 1;
      return payload;
    } catch (error) {
      const { message } = error;
      if (message === 'jwt malformed') return 1;
      return 2;
    }
  },
};

module.exports = UserUtils;
