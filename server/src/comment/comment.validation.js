'use strict';

const CommentValidation = {
  Content: (req, res, next) => {
    const { content } = req.body;

    if (!content) {
      return res.status(400).send({
        ok: false,
        message: '댓글 내용을 입력하세요.',
      });
    }

    next();
  },
};

module.exports = CommentValidation;
