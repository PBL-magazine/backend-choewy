'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const rounds = Number(process.env.ROUNDS) || 10;

const UserUtils = {
  /* @ Hashing Password Util */
  HashPassword(password) {
    const salt = bcrypt.genSaltSync(rounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },

  /* @ Compare Password Util */
  ComparePassword(password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  /* @ Generate Token Util */
  GenerateToken(payload) {
    return jwt.sign(payload, secret);
  },

  /* @ Token Authorization Check Util */
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
