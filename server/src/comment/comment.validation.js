'use strict';

const Response = require('../../commons/response');
const CommentError = require('./comment.error');

const CommentValidation = {
  /* 댓글 내용의 적합성을 검사합니다. */
  Content: (req, res, next) => {
    try {
      !req.body.content && CommentError.NotContent();
    } catch (error) {
      return Response.Fails(res, error);
    }

    next();
  },
};

module.exports = CommentValidation;
