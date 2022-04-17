'use strict';

const Joi = require('joi');
const Response = require('../../commons/response');
const UserError = require('./user.error');

const Validation = {
  email: Joi.string().email().required().messages({
    'any.required': '이메일을 입력하세요',
    'string.empty': '이메일을 입력하세요.',
    'string.base': '이메일 형식에 맞지 않습니다.',
    'string.email': '이메일 형식에 맞지 않습니다.',
  }),

  nickname: Joi.string().min(3).max(10).required().messages({
    'any.required': '닉네임을 입력하세요',
    'string.empty': '닉네임을 입력하세요.',
    'string.min': '닉네임은 3~10자 이내로 입력하세요.',
    'string.max': '닉네임은 3~10자 이내로 입력하세요.',
    'string.base': '닉네임 형식에 맞지 않습니다.',
  }),

  password: Joi.string().min(4).max(20).required().messages({
    'any.required': '비밀번호를 입력하세요',
    'string.empty': '비밀번호를 입력하세요.',
    'string.min': '비밀번호는 4~20자 이상으로 입력하세요.',
    'string.max': '비밀번호는 4~20자 이상으로 입력하세요.',
    'string.base': '비밀번호 형식에 맞지 않습니다.',
  }),

  confirmPassword: Joi.string().min(4).max(20).required().messages({
    'any.required': '비밀번호를 입력하세요',
    'string.empty': '비밀번호를 입력하세요.',
    'string.min': '비밀번호는 4~20자 이상으로 입력하세요.',
    'string.max': '비밀번호는 4~20자 이상으로 입력하세요.',
    'string.base': '비밀번호 형식에 맞지 않습니다.',
  }),
};

const UserValidation = {
  /* @Email Validation */
  Email: async (req, res, next) => {
    try {
      const { email } = req.body;
      await Validation.email.validateAsync(email);
      next();
    } catch (error) {
      return Response.Validation(res, error);
    }
  },

  /* @Nickname Validation */
  Nickname: async (req, res, next) => {
    try {
      const { nickname } = req.body;
      await Validation.nickname.validateAsync(nickname);
      next();
    } catch (error) {
      return Response.Validation(res, error);
    }
  },

  /* @Password Validation */
  Password: async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      await Validation.password.validateAsync(password);
      const isInclude = password.includes(nickname);
      isInclude && UserError.NicknameInPassword();
      next();
    } catch (error) {
      return Response.Validation(res, error);
    }
  },

  /* @Password Validation */
  confirmPassword: async (req, res, next) => {
    try {
      const { password, confirmPassword } = req.body;
      await Validation.confirmPassword.validateAsync(confirmPassword);
      const isCorrect = password !== confirmPassword;
      !isCorrect && UserError.InvalidPassword();
      next();
    } catch (error) {
      return Response.Validation(res, error);
    }
  },
};

module.exports = UserValidation;
