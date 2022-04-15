'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const rounds = Number(process.env.ROUNDS) || 10;

const UserUtils = {
  HashPassword(password) {
    const salt = bcrypt.genSaltSync(rounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },

  ComparePassword(password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  GenerateToken(payload) {
    return jwt.sign(payload, secret);
  },

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
