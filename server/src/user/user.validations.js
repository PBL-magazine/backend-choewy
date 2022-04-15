'use strict';

const regularExp = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  nickname: /^[a-z0-9]{3,20}$/g,
};

const UserValidation = {
  Email: (req, res, next) => {
    const { email } = req.body;

    if (!email || !regularExp.email.test(email)) {
      return res.status(400).send({
        ok: false,
        message: '이메일 형식에 맞지 않습니다.',
      });
    }

    next();
  },
  Nickname: (req, res, next) => {
    const { nickname } = req.body;

    // TODO : 여러 번 같은 정보로 요청하면 정규표현식에는 맞게 나오는데
    // 여기서 응답 처리됨. 왜지?
    if (!nickname || !regularExp.nickname.test(nickname)) {
      return res.status(400).send({
        ok: false,
        message: '닉네임 형식에 맞지 않습니다.',
      });
    }

    next();
  },
  Password: (req, res, next) => {
    const { nickname, password, confirmPassword } = req.body;

    if (!password) {
      return res.status(400).send({
        ok: false,
        message: '비밀번호를 입력하세요.',
      });
    }

    if (password.length < 4 || password.includes(nickname)) {
      return res.status(400).send({
        ok: false,
        message: '비밀번호 형식에 맞지 않습니다.',
      });
    }

    if (confirmPassword & (!password !== confirmPassword)) {
      return res.status(400).send({
        ok: false,
        message: '비밀번호가 같지 않습니다.',
      });
    }

    next();
  },
};

module.exports = UserValidation;
