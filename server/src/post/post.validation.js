'use strict';

const PostValidation = {
  Content: (req, res, next) => {
    const { content } = req.body;

    if (!content) {
      return res.status(400).send({
        ok: false,
        message: '게시물의 내용을 입력하세요.',
      });
    }

    next();
  },
  Image: (req, res, next) => {
    const { file } = req;

    if (!file) {
      return res.status(400).send({
        ok: false,
        message: '이미지 파일을 선택하세요.',
      });
    }

    next();
  },
};

module.exports = PostValidation;
