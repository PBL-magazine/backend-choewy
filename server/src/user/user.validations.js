'use strict';

const regularExp = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  nickname: /^[a-z]+[a-z0-9]{2,19}$/g,
};

const UserValidation = {
  Email: (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: '이메일을 입력하세요.' });
    }

    if (!regularExp.email.test(email)) {
      return res.status(400).send({ message: '이메일 형식에 맞지 않습니다.' });
    }

    next();
  },
  Nickname: (req, res, next) => {
    const { nickname } = req.body;

    if (!nickname) {
      return res.status(400).send({ message: '닉네임을 입력하세요.' });
    }

    if (!regularExp.nickname.test(nickname)) {
      return res.status(400).send({ message: '닉네임 형식에 맞지 않습니다.' });
    }

    next();
  },
  Password: (req, res, next) => {
    const { nickname, password, confirmPassword } = req.body;

    if (!password) {
      return res.status(400).send({ message: '비밀번호를 입력하세요.' });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .send({ message: '비밀번호 형식에 맞지 않습니다.' });
    }

    if (password.includes(nickname)) {
      return res
        .status(400)
        .send({ message: '비밀번호 형식에 맞지 않습니다.' });
    }

    if (confirmPassword & (!password !== confirmPassword)) {
      return res.status(400).send({ message: '비밀번호가 같지 않습니다.' });
    }

    next();
  },
};

module.exports = UserValidation;
