'use strict';

const UserError = {
  NotFoundEmail: () => {
    throw {
      code: 404,
      message: '존재하지 않는 계정입니다.',
    };
  },
  NotFoundUser: () => {
    throw {
      code: 404,
      message: '사용자 정보를 찾을 수 없습니다.',
    };
  },
  AlreadyExist: () => {
    throw {
      code: 409,
      message: '이미 존재하는 이메일 계정입니다.',
    };
  },
  IncorrectSign: () => {
    throw {
      code: 401,
      message: '이메일 또는 비밀번호를 확인하세요.',
    };
  },
  NeedSignin: () => {
    throw {
      code: 401,
      message: '로그인이 필요합니다.',
    };
  },
  NicknameInPassword: () => {
    throw {
      details: [
        {
          message: '비밀번호에 닉네임이 포함되어 있습니다.',
        },
      ],
    };
  },
  InvalidPassword: () => {
    throw {
      details: [
        {
          message: '비밀번호가 일치하지 않습니다.',
        },
      ],
    };
  },
};

module.exports = UserError;
