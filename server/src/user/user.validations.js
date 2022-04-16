'use strict';

const Joi = require('joi');

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

const Exceptions = (error) => {
  const { details } = error;
  const { message } = details[0];
  return message;
};

const UserValidation = {
  Email: async (req, res, next) => {
    try {
      const { email } = req.body;
      await Validation.email.validateAsync(email);
      next();
    } catch (error) {
      const message = Exceptions(error);
      res.status(400).send({ ok: false, message });
    }
  },
  Nickname: async (req, res, next) => {
    try {
      const { nickname } = req.body;
      await Validation.nickname.validateAsync(nickname);
      next();
    } catch (error) {
      const message = Exceptions(error);
      res.status(400).send({ ok: false, message });
    }
  },
  Password: async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      await Validation.password.validateAsync(password);
      if (password.includes(nickname)) {
        return res.status(400).send({
          ok: false,
          message: '비밀번호에 닉네임이 포함되어 있습니다.',
        });
      }
      next();
    } catch (error) {
      const message = Exceptions(error);
      res.status(400).send({ ok: false, message });
    }
  },
  // 이 부분은 고려하지 않기로 하였음(20220416)
  confirmPassword: async (req, res, next) => {
    try {
      const { password, confirmPassword } = req.body;
      await Validation.confirmPassword.validateAsync(confirmPassword);
      if (password !== confirmPassword) {
        return res.status(400).send({
          ok: false,
          message: '비밀번호가 일치하지 않습니다.',
        });
      }
      next();
    } catch (error) {
      const message = Exceptions(error);
      res.status(400).send({ ok: false, message });
    }
  },
};

module.exports = UserValidation;
